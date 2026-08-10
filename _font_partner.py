"""
파트너 페이지(/partner/) 전용 Pretendard 서브셋.

  왜 따로 굽는가:
    루트 랜딩이 쓰는 `PretendardVariable-subset.woff2` 는 루트 카피에서 구운 것이라
    파트너 페이지의 새 글자가 없다. 없는 글자는 대체 폰트(맑은 고딕)로 떨어져
    한 문장이 두 폰트로 쪼개져 보인다.

    공용 서브셋에 파트너 글자를 합칠 수도 있지만, 그러면 루트가 쓰는 파일이
    같이 커지고 두 페이지가 서로 묶인다. 파트너 페이지는 광고 도착지라
    로딩이 특히 중요하므로 **자기 글자만 든 파일**을 따로 갖는 게 낫다.

  실행:
    /c/ProgramData/anaconda3/python.exe _font_partner.py
    (기본 python 에는 fontTools 가 없다)

  ⚠️ partner/index.html 의 카피를 바꾸면 반드시 다시 돌릴 것.
"""

import os
import sys

SRC = "_fonts_src/PretendardVariable.woff2"
OUT = "assets/fonts/PretendardVariable-partner.woff2"
PAGE = "partner/index.html"

# 소스에 지금 없더라도 나중에 쓸 가능성이 높은 것들
ALWAYS = (
    "".join(chr(c) for c in range(0x20, 0x7F))  # ASCII 전체
    + "…·—–‘’“”₩※→←↑↓✓"
    + "0123456789%"
    + "월화수목금토일년원개점명번호전화문의상담신청접수마감"
    + "제주산방식당밀면냉비빔장육수생만두국밥고기수육"
    + "사장님매장브랜드가맹교육무료샘플직영서울본점"
)


def main() -> int:
    if not os.path.exists(SRC):
        print(f"원본이 없다: {SRC}")
        return 1
    if not os.path.exists(PAGE):
        print(f"페이지가 없다: {PAGE}")
        return 1

    from fontTools import subset  # noqa: PLC0415

    with open(PAGE, encoding="utf-8") as fh:
        chars = set(fh.read())
    chars |= set(ALWAYS)
    # 개행·탭 같은 제어문자는 글리프가 아니다
    chars = {c for c in chars if c.isprintable() and c != " "} | {" "}

    text = "".join(sorted(chars))
    print(f"서브셋 대상 글자: {len(text)}자")

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    subset.main(
        [
            SRC,
            f"--text={text}",
            "--flavor=woff2",
            f"--output-file={OUT}",
            "--layout-features=*",  # 자간·합자 등 유지
            "--drop-tables+=DSIG",
            "--name-IDs=*",
        ]
    )

    before = os.path.getsize(SRC) / 1024
    after = os.path.getsize(OUT) / 1024
    print(f"\n{SRC}  {before:8.0f} KB")
    print(f"{OUT}  {after:8.0f} KB   ({100 - after / before * 100:.1f}% 감소)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
