"""
Pretendard 서브셋 생성 — 페이지가 실제로 쓰는 글자만 남긴다.

  왜 필요한가:
    jsDelivr 의 `pretendardvariable-dynamic-subset.css` 는 유니코드 구간별로
    쪼갠 woff2 를 필요한 만큼 받아온다. 그런데 한글 페이지는 구간이 넓게
    걸려서 실측 580KB 가 나온다. 첫 화면 예산(2.2MB)에서 이건 너무 크다.

    이 스크립트는 소스에 등장하는 글자 + 안전 여유분만 남겨 자체 호스팅용
    woff2 하나를 만든다. 가변축(wght 45~930)은 그대로 유지하므로
    font-weight 를 400/700/800 자유롭게 쓸 수 있다.

  실행:
    python _font_pretendard.py

  ⚠️ 카피를 바꾸면 다시 돌려야 한다.
     서브셋에 없는 글자는 대체 폰트(맑은 고딕)로 떨어져 한 문장이
     두 폰트로 쪼개져 보인다. 빌드 전에 한 번 돌리는 것을 권장.

  원본(_fonts_src/)은 .gitignore 대상 — devnew 헌법 1번:
  원본은 클라우드, 프로젝트엔 웹용 사본만.
"""

import glob
import os
import sys

SRC = "_fonts_src/PretendardVariable.woff2"
OUT = "app/public/assets/fonts/PretendardVariable-subset.woff2"

# 글자를 긁어올 소스 — 카피는 전부 여기 안에 있다
PATTERNS = ["app/src/**/*.tsx", "app/src/**/*.ts", "app/src/**/*.css", "app/index.html"]

# 항상 포함 — 소스에 지금 없더라도 나중에 쓰일 가능성이 높은 것들
ALWAYS = (
    "".join(chr(c) for c in range(0x20, 0x7F))          # ASCII 전체
    + "…·—–‘’“”₩※△▲▼◇◆○●□■★☆✓✕→←↑↓"        # 기호
    + "0123456789%"
    + "가나다라마바사아자차카타파하"                      # 자주 쓰는 음절 여유분
    + "월화수요일년원개점명번호전화문의상담신청접수"
    + "제주산방식당밀면냉비빔장육수생만두국밥고기"
    + "겨울여름봄가을매출사장님매장브랜드육돈까스제"
)


def collect() -> set[str]:
    chars: set[str] = set(ALWAYS)
    files = 0
    for pat in PATTERNS:
        for path in glob.glob(pat, recursive=True):
            try:
                with open(path, encoding="utf-8") as fh:
                    chars |= set(fh.read())
                files += 1
            except OSError as e:
                print(f"  건너뜀 {path}: {e}")
    print(f"소스 {files}개에서 글자 수집")
    # 개행·탭 같은 제어문자는 글리프가 아니다
    return {c for c in chars if c.isprintable() and c != " "} | {" "}


def main() -> int:
    if not os.path.exists(SRC):
        print(f"원본이 없다: {SRC}")
        print("받기:")
        print(
            "  curl -sL -o _fonts_src/PretendardVariable.woff2 \\\n"
            "    https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9"
            "/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2"
        )
        return 1

    from fontTools import subset  # noqa: PLC0415  (원본 확인 후에 import)

    text = "".join(sorted(collect()))
    print(f"서브셋 대상 글자: {len(text)}자")

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    args = [
        SRC,
        f"--text={text}",
        "--flavor=woff2",
        f"--output-file={OUT}",
        "--layout-features=*",   # 자간·합자 등 유지
        "--drop-tables+=DSIG",
        "--name-IDs=*",
    ]
    subset.main(args)

    before = os.path.getsize(SRC) / 1024
    after = os.path.getsize(OUT) / 1024
    print(f"\n{SRC}  {before:8.0f} KB")
    print(f"{OUT}  {after:8.0f} KB   ({100 - after / before * 100:.1f}% 감소)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
