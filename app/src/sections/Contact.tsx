import { useRef, useState } from "react";
import {
  A,
  INSTA,
  MAIL_INQUIRY,
  MAIL_OFFICIAL,
  Rv,
  TEL_INQUIRY,
  TITLE_GRADIENT,
  WEB3FORMS_KEY,
  fireLead,
  track,
} from "../lib/ui";

/* ══ ⑰ 문의 ═════════════════════════════════════════════════════
   폼을 페이지 안에서 처리한다. 외부 폼 서비스로 내보내면
   ① 메타 픽셀·GA4 전환 추적이 그 지점에서 끊기고
   ② 임베드 위젯이 전송량을 4MB 넘게 잡아먹는다.

   전송은 Web3Forms(무료) — 제출 내용이 MAIL_INQUIRY 로 바로 온다.
   ⚠️ WEB3FORMS_KEY 가 비어 있으면 메일 앱 폴백이 뜨는데,
      그때 수신 주소가 화면에 노출된다. 반드시 키를 넣을 것.
   ──────────────────────────────────────────────────────────── */

/* 문의 유형 — 대상 5개 층 + 프리미엄 트랙 + 미정.
   ⚠️ "공식 브랜드 파트너(산방식당 이름 사용)"는 프리미엄 트랙 문의 창구이며
      실제로 브랜드를 공유하는 트랙이다(동래정·CJ프레시웨이). 빼지 말 것.
      단 메뉴솔루션 트랙에는 간판을 주지 않는다. */
const INTERESTS = [
  "기존 매장에 시그니처 메뉴 도입",
  "밀냉면 · 밀면 도입 (검증된 맛)",
  "창업 예정 — 프랜차이즈 없이 시작",
  "급식 · 리조트 · 대량 공급",
  "자사 브랜드에 접목 (본사 · 제휴)",
  "공식 브랜드 파트너 (산방식당 이름 사용)",
  "아직 정하지 못했습니다",
];

type Status = "idle" | "sending" | "done";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  /** 키가 없을 때의 대체 경로 — 입력값을 메일 본문으로 만들어 메일 앱을 연다 */
  const openMail = (fd: FormData) => {
    const body = ["매장명/브랜드", "성함", "연락처", "지역", "관심 분야", "문의 내용"]
      .map((k) => `${k}: ${String(fd.get(k) ?? "")}`)
      .join("\n");
    window.location.href = `mailto:${MAIL_INQUIRY}?subject=${encodeURIComponent(
      "[메뉴솔루션] 도입 문의"
    )}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // 봇 잡이 — 사람 눈에는 안 보이는 칸이 채워졌으면 무시한다
    if (fd.get("botcheck")) return;

    if (!WEB3FORMS_KEY) {
      fireLead();
      openMail(fd);
      return;
    }

    setStatus("sending");
    setError("");
    try {
      // multipart 로 보내면 Web3Forms 가 한글 필드명을 깨뜨린다 → urlencoded 로 전송
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new URLSearchParams(fd as unknown as Record<string, string>),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "submit failed");
      fireLead();
      setStatus("done");
    } catch {
      // 네트워크·봇판정 등 예외: 문의를 잃지 않도록 메일 앱으로 넘긴다
      fireLead();
      setError("전송이 원활하지 않아 메일 앱으로 연결합니다.");
      setStatus("idle");
      openMail(fd);
    }
  };

  return (
    <section id="contact" className="bg-dawn px-5 py-20 md:px-8 md:py-[120px]">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* 왼쪽 — 인사말과 직통 창구. 모바일은 가운데 정렬(사용자 지시) */}
          <Rv className="text-center lg:text-left">
            {/* 제목 질감은 페이지의 다른 섹션과 같은 그라디언트.
                ⚠️ 여기만 가운데 정렬을 안 한다 — 오른쪽에 폼이 붙는 2단 배치라
                   가운데로 몰면 폼과 축이 어긋난다. */}
            <h2
              className="mx-auto max-w-[13em] font-extrabold lg:mx-0"
              style={{
                ...TITLE_GRADIENT,
                fontSize: "clamp(1.85rem, 4vw, 3.1rem)",
                lineHeight: 1.18,
                letterSpacing: "-0.04em",
              }}
            >
              언제든 제주의 맛으로
              <br />
              함께하겠습니다.
            </h2>
            <p
              className="mx-auto mt-6 max-w-[440px] text-body lg:mx-0"
              style={{ fontSize: "clamp(15.5px, 1.6vw, 17.5px)", lineHeight: 1.72 }}
            >
              지금 운영 중인 매장이든, 준비 중인 창업이든 좋습니다. 매장 상황을 들려주시면{" "}
              <strong className="font-bold text-ink">맞는 메뉴 구성부터 함께 잡아 드립니다.</strong>
            </p>

            {/* 연락처 — 보여만 주고 누르면 아무 일도 일어나지 않는다.
                (사용자 지시 2026-07-29: "실제로 전화나 이메일이 안 가게")

                그래서 <a> 가 아니라 <div> 다. tel:/mailto: 링크도, 클릭 추적도 없다.
                누를 수 있는 것처럼 보이면 안 되므로 화살표(→)와 호버 반응도 걷어냈다
                — 눌러도 반응이 없는 버튼은 고장 난 사이트로 읽힌다.
                ⚠️ 그래도 화면에는 번호가 그대로 보인다. 직접 걸어 보는 사람은
                   막을 수 없으니, 070 회선이 실제로 살아 있어야 한다.
                ⚠️ 상단 네비와 푸터의 전화·메일은 아직 링크로 살아 있다.
                   그쪽도 끊을지는 미확인. */}
            <div className="mt-10 space-y-3">
              <div className="rounded-[20px] border border-brand/40 bg-paper px-6 py-6">
                <div className="text-[13px] font-bold text-brand md:text-[14px]">
                  도입 문의 · 바로 통화
                </div>
                <div
                  className="mt-1 font-extrabold tracking-[-0.03em] text-ink"
                  style={{ fontSize: "clamp(21px, 2.6vw, 30px)", lineHeight: 1.2 }}
                >
                  {TEL_INQUIRY}
                </div>
              </div>

              <div className="rounded-[20px] border border-ink/15 bg-paper/70 px-6 py-5">
                <div className="text-[13px] font-medium text-muted md:text-[13.5px]">
                  제휴 · 기타 문의
                </div>
                <div className="mt-1 text-[15px] font-bold tracking-[-0.02em] text-ink md:text-[16.5px]">
                  {MAIL_OFFICIAL}
                </div>
              </div>
            </div>
          </Rv>

          {/* 오른쪽 — 문의 폼 */}
          <Rv d={120}>
            <div className="rounded-[24px] border border-line bg-paper p-7 shadow-[0_12px_32px_rgba(23,18,15,0.06)] md:p-10">
              {status === "done" ? (
                <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                  <div className="mb-5 text-[40px]">✅</div>
                  <p className="text-[21px] font-extrabold tracking-[-0.03em] text-ink md:text-[24px]">
                    상담 신청이 접수되었습니다.
                  </p>
                  <p className="t-body mt-3 text-[15.5px] md:text-[16.5px]">
                    담당자가 확인하고 빠르게 연락드리겠습니다.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={onSubmit} noValidate={false}>
                  <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
                  <input type="hidden" name="subject" value="[산방식당 메뉴솔루션] 도입 문의" />
                  <input type="hidden" name="from_name" value="제주산방식당 랜딩페이지" />
                  {/* 봇 잡이 — 사람에게는 보이지 않는다 */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    aria-hidden
                    className="hidden"
                  />

                  <div className="space-y-5">
                    <Field
                      id="f-store"
                      name="매장명/브랜드"
                      label="매장명 · 브랜드명"
                      placeholder="예: OO식당 OO점 (준비 중이시면 ‘예정’이라고 적어주세요)"
                      required
                    />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="f-name" name="성함" label="성함" placeholder="담당자 성함" required />
                      <Field
                        id="f-tel"
                        name="연락처"
                        label="연락처"
                        type="tel"
                        placeholder="010-0000-0000"
                        required
                      />
                      {/* 지역 — 제주 제외 원칙 + 기존 가맹점 영업권 보호를 접수 단계에서 거른다 */}
                      <Field
                        id="f-area"
                        name="지역"
                        label="매장 지역"
                        placeholder="예: 경기 수원시"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="f-interest"
                        className="mb-2 block text-[14px] font-bold tracking-[-0.02em] text-ink md:text-[15px]"
                      >
                        관심 분야
                      </label>
                      <select
                        id="f-interest"
                        name="관심 분야"
                        defaultValue={INTERESTS[0]}
                        className="w-full rounded-[14px] border border-line bg-warm px-4 py-4 text-[15.5px] text-ink outline-none transition-colors duration-150 focus:border-brand"
                      >
                        {INTERESTS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="f-msg"
                        className="mb-2 block text-[14px] font-bold tracking-[-0.02em] text-ink md:text-[15px]"
                      >
                        문의 내용
                      </label>
                      <textarea
                        id="f-msg"
                        name="문의 내용"
                        rows={4}
                        placeholder="지금 하고 계신 메뉴, 매장 규모, 궁금하신 점을 자유롭게 적어주세요."
                        className="w-full resize-y rounded-[14px] border border-line bg-warm px-4 py-4 text-[15.5px] leading-relaxed text-ink outline-none transition-colors duration-150 placeholder:text-muted focus:border-brand"
                      />
                    </div>
                  </div>

                  {/* 개인정보 동의 */}
                  <div className="mt-6 rounded-[16px] border border-line bg-warm px-5 py-4">
                    <label className="flex cursor-pointer items-start gap-3 text-[14.5px] leading-relaxed text-ink md:text-[15px]">
                      <input
                        type="checkbox"
                        name="개인정보동의"
                        value="동의함"
                        required
                        className="mt-1 h-4 w-4 shrink-0 accent-[#cf5a1c]"
                      />
                      <span>
                        개인정보 수집·이용에 동의합니다. <b className="text-brand">(필수)</b>
                      </span>
                    </label>

                    <details className="mt-3">
                      <summary className="cursor-pointer text-[12.5px] font-semibold text-muted hover:text-brand">
                        자세히 보기
                      </summary>
                      <div className="mt-3 space-y-1.5 text-[12px] leading-relaxed text-body">
                        <p>
                          <b className="text-ink">수집 항목</b> · 매장명·브랜드명, 성함, 연락처, 지역, 관심
                          분야, 문의 내용
                        </p>
                        <p>
                          <b className="text-ink">이용 목적</b> · 도입 상담 및 문의 응대
                        </p>
                        <p>
                          <b className="text-ink">보유 기간</b> · 상담 완료 후 6개월 (기간 경과 시 지체 없이
                          파기)
                        </p>
                        <p>
                          <b className="text-ink">거부 권리</b> · 동의를 거부하실 수 있으며, 거부 시 상담
                          접수가 제한됩니다.
                        </p>
                        <p className="pt-1">
                          본 사이트는 서비스 개선과 광고 성과 측정을 위해 Google Analytics, Meta Pixel을
                          사용하며, 이 과정에서 쿠키를 통한 방문 기록이 수집될 수 있습니다. 개인정보 관련
                          문의: {MAIL_OFFICIAL}
                        </p>
                        {/* 전문 링크 — 메타·구글 광고 심사가 독립된 주소를 요구하는 경우가 있다.
                            페이지 실체는 app/public/privacy.html (빌드 시 루트로 복사된다) */}
                        <p className="pt-1">
                          <a
                            href="/privacy.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-brand underline underline-offset-2"
                          >
                            개인정보처리방침 전문 보기
                          </a>
                        </p>
                      </div>
                    </details>
                  </div>

                  {error && <p className="mt-4 text-[13px] font-semibold text-brand">{error}</p>}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    onClick={() => track("form-submit")}
                    className="mt-7 w-full rounded-full bg-brand px-8 py-5 text-[17px] font-extrabold tracking-[-0.02em] text-white transition-colors duration-150 hover:bg-brand-2 disabled:opacity-60 md:text-[18px]"
                  >
                    {status === "sending" ? "전송 중…" : "도입 상담 신청"}
                  </button>

                  <p className="mt-5 text-center text-[13.5px] leading-relaxed text-muted">
                    남겨주신 연락처는 도입 상담 목적으로만 사용합니다.
                    <br />
                    <b className="text-body">담당자가 직접 확인하고 연락드립니다.</b>
                  </p>
                </form>
              )}
            </div>
          </Rv>
        </div>
      </div>
    </section>
  );
}

/** 폼 입력 한 줄 */
function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[14px] font-bold tracking-[-0.02em] text-ink md:text-[15px]">
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-[14px] border border-line bg-warm px-4 py-4 text-[15.5px] text-ink outline-none transition-colors duration-150 placeholder:text-muted focus:border-brand"
      />
    </div>
  );
}

/* ══ 푸터 ═══════════════════════════════════════════════════════ */
export function Footer() {
  return (
    <footer className="bg-ink px-5 py-14 text-paper/45 md:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <img
              src={`${A}/logo.webp`}
              alt="제주산방식당"
              width={40}
              height={40}
              loading="lazy"
              className="mb-4 h-9 w-auto"
            />
            <p className="text-[13px] leading-[1.9]">
              주식회사 산방에프앤비 · 대표 김형섭
              <br />
              사업자등록번호 788-87-01449
              <br />
              제주특별자치도 서귀포시 대정읍 하모이삼로 62
            </p>
          </div>
          <div className="flex flex-col gap-2 text-[13px] md:items-end">
            <a href={INSTA} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
              Instagram @sanbang_official
            </a>
            {/* 메일·전화는 표시만 — 누르면 아무 일도 일어나지 않는다(사용자 지시).
                인스타그램만 실제 링크로 남긴다. */}
            <span>{MAIL_OFFICIAL}</span>
            <span>도입 문의 {TEL_INQUIRY}</span>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-paper/25">
          <span>
            − SINCE 1971 − © {new Date().getFullYear()} SANBANG F&B Co., Ltd. All rights reserved.
          </span>
          <a
            href="/privacy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-paper/60"
          >
            개인정보처리방침
          </a>
        </div>
      </div>
    </footer>
  );
}
