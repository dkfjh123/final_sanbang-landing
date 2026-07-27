import { useRef, useState } from "react";
import { A, INSTA, MAIL, Rv, TEL_MAIN, WEB3FORMS_KEY, fireLead, track } from "../lib/ui";

/* ══ ⑰ 문의 — 소개서 21p ════════════════════════════════════════
   폼을 페이지 안에서 처리한다. 외부 폼 서비스로 내보내면
   ① 메타 픽셀·GA4 전환 추적이 그 지점에서 끊기고
   ② 임베드 위젯이 전송량을 4MB 넘게 잡아먹는다.

   전송은 Web3Forms(무료) — 제출 내용이 contact@jejusanbang.com 으로 바로 온다.
   ⚠️ WEB3FORMS_KEY 가 비어 있으면 메일 앱을 여는 방식으로 자동 대체된다.
      즉 키가 없어도 문의는 유실되지 않는다.
   ──────────────────────────────────────────────────────────── */

const INTERESTS = [
  "메뉴솔루션 (검증된 맛 도입)",
  "공식 브랜드 파트너 (산방식당 이름 사용)",
  "급식 · 대량 공급",
  "HMR · 밀키트 협업",
  "아직 정하지 못했습니다",
];

type Status = "idle" | "sending" | "done";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  /** 키가 없을 때의 대체 경로 — 입력값을 메일 본문으로 만들어 메일 앱을 연다 */
  const openMail = (fd: FormData) => {
    const body = ["매장명/브랜드", "성함", "연락처", "관심 분야", "문의 내용"]
      .map((k) => `${k}: ${String(fd.get(k) ?? "")}`)
      .join("\n");
    window.location.href = `mailto:${MAIL}?subject=${encodeURIComponent(
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
    <section
      id="contact"
      className="px-5 py-24 md:px-8 md:py-[120px]"
      style={{
        background: "radial-gradient(120% 90% at 50% 0%, #fbe9cd 0%, #fdf3e2 45%, #fffdf8 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* 왼쪽 — 인사말과 직통 창구 */}
          <Rv>
            <div className="t-label mb-6 text-brand">PARTNERSHIP INQUIRY</div>
            <h2 className="t-h2 text-[2rem] md:text-[2.6rem]">
              언제든 제주의 맛으로
              <br />
              함께하겠습니다.
            </h2>
            <p className="t-body mt-7 max-w-md text-[15.5px]">
              메뉴솔루션 · 공식 브랜드 파트너 · HMR 협업 — 어떤 형태의 협업이라도 좋습니다. 천천히, 그러나
              꼼꼼하게 함께 고민하겠습니다.
            </p>

            <div className="mt-10 space-y-3">
              <a
                href={`mailto:${MAIL}?subject=${encodeURIComponent("[메뉴솔루션] 도입 문의드립니다")}`}
                onClick={() => track("contact-mail")}
                className="flex items-center justify-between gap-4 rounded-[20px] border border-ink/15 bg-paper/70 px-6 py-5 transition-colors duration-150 hover:border-brand hover:bg-paper"
              >
                <div>
                  <div className="text-[12px] font-medium text-muted">이메일</div>
                  <div className="mt-0.5 text-[15px] font-bold tracking-[-0.02em] text-ink">{MAIL}</div>
                </div>
                <span className="text-brand">→</span>
              </a>

              <a
                href={`tel:+82${TEL_MAIN.replace(/^0/, "").replace(/-/g, "")}`}
                onClick={() => track("contact-tel")}
                className="flex items-center justify-between gap-4 rounded-[20px] border border-ink/15 bg-paper/70 px-6 py-5 transition-colors duration-150 hover:border-brand hover:bg-paper"
              >
                <div>
                  <div className="text-[12px] font-medium text-muted">전화 · 모슬포 본점</div>
                  <div className="mt-0.5 text-[15px] font-bold tracking-[-0.02em] text-ink">{TEL_MAIN}</div>
                </div>
                <span className="text-brand">→</span>
              </a>
            </div>
          </Rv>

          {/* 오른쪽 — 문의 폼 */}
          <Rv d={120}>
            <div className="rounded-[24px] border border-line bg-paper p-7 shadow-[0_12px_32px_rgba(23,18,15,0.06)] md:p-10">
              {status === "done" ? (
                <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                  <div className="mb-5 text-[40px]">✅</div>
                  <p className="text-[18px] font-bold tracking-[-0.02em] text-ink">
                    상담 신청이 접수되었습니다.
                  </p>
                  <p className="t-body mt-3 text-[14.5px]">
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
                    </div>

                    <div>
                      <label
                        htmlFor="f-interest"
                        className="mb-2 block text-[13px] font-bold tracking-[-0.02em] text-ink"
                      >
                        관심 분야
                      </label>
                      <select
                        id="f-interest"
                        name="관심 분야"
                        defaultValue={INTERESTS[0]}
                        className="w-full rounded-[14px] border border-line bg-warm px-4 py-3.5 text-[14.5px] text-ink outline-none transition-colors duration-150 focus:border-brand"
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
                        className="mb-2 block text-[13px] font-bold tracking-[-0.02em] text-ink"
                      >
                        문의 내용
                      </label>
                      <textarea
                        id="f-msg"
                        name="문의 내용"
                        rows={4}
                        placeholder="지금 하고 계신 메뉴, 매장 규모, 궁금하신 점을 자유롭게 적어주세요."
                        className="w-full resize-y rounded-[14px] border border-line bg-warm px-4 py-3.5 text-[14.5px] leading-relaxed text-ink outline-none transition-colors duration-150 placeholder:text-muted focus:border-brand"
                      />
                    </div>
                  </div>

                  {/* 개인정보 동의 */}
                  <div className="mt-6 rounded-[16px] border border-line bg-warm px-5 py-4">
                    <label className="flex cursor-pointer items-start gap-3 text-[13.5px] leading-relaxed text-ink">
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
                          <b className="text-ink">수집 항목</b> · 매장명·브랜드명, 성함, 연락처, 관심 분야,
                          문의 내용
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
                          문의: {MAIL}
                        </p>
                      </div>
                    </details>
                  </div>

                  {error && <p className="mt-4 text-[13px] font-semibold text-brand">{error}</p>}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    onClick={() => track("form-submit")}
                    className="mt-6 w-full rounded-full bg-brand px-8 py-4 text-[15.5px] font-bold tracking-[-0.01em] text-white transition-colors duration-150 hover:bg-brand-2 disabled:opacity-60"
                  >
                    {status === "sending" ? "전송 중…" : "도입 상담 신청"}
                  </button>

                  <p className="mt-4 text-center text-[12.5px] leading-relaxed text-muted">
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
      <label htmlFor={id} className="mb-2 block text-[13px] font-bold tracking-[-0.02em] text-ink">
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-[14px] border border-line bg-warm px-4 py-3.5 text-[14.5px] text-ink outline-none transition-colors duration-150 placeholder:text-muted focus:border-brand"
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
            <a href={`mailto:${MAIL}`} className="hover:text-gold">
              {MAIL}
            </a>
            <a href={`tel:+82${TEL_MAIN.replace(/^0/, "").replace(/-/g, "")}`} className="hover:text-gold">
              {TEL_MAIN}
            </a>
          </div>
        </div>
        <p className="mt-12 text-[12px] text-paper/25">
          − SINCE 1971 − © {new Date().getFullYear()} SANBANG F&B Co., Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
