#!/usr/bin/env bash
# 제주한라산체 서브셋 만들기
#
#  왜 필요한가:
#    한글 폰트 원본(TTF)은 1만1천여 글자가 다 들어 있어 6.7MB다.
#    그대로 웹에 쓰면 첫 화면이 그만큼 무거워진다.
#    히어로 제목에 실제로 쓰는 글자만 남기면 수십 KB로 줄어든다.
#
#  구글 CDN(earlyaccess)은 2024년 이후 파일이 전부 404다. 자체 호스팅이 유일한 방법.
#
#  ⚠️ 히어로 제목 문구를 바꾸면 아래 TEXT에 그 글자를 넣고 다시 돌려야 한다.
#     안 그러면 없는 글자만 다른 폰트로 나와서 문장이 섞여 보인다.
#     실행:  bash _font.sh
set -e

PY=/c/ProgramData/anaconda3/python.exe
SRC="_fonts_src/JejuHallasan.ttf"
OUT="app/public/assets/fonts/JejuHallasan-subset.woff2"

# 히어로 제목에 쓰는 글자 + 나중에 문구를 조금 손봐도 깨지지 않게 여유분
TEXT=$(cat <<'EOF'
간판은그대로년을이어온맛갑니다바꿉검증된들여오세요
제주산방식당모슬포밀냉면육수비빔전용장생만두국밥
온둣확장메뉴도확인공급품목급식단체회사대표브랜드
한상차림겨자고추장멸치오래끓인가게손님줄서는집
0123456789.,·-~!?()'"
EOF
)

mkdir -p app/public/assets/fonts
CHARS=$(printf '%s' "$TEXT" | tr -d '\n')

# 제주서체 3종 모두 서브셋해 둔다 (한라산=붓글씨 / 고딕 / 명조)
for f in JejuHallasan JejuGothic JejuMyeongjo; do
  src="_fonts_src/$f.ttf"
  out="app/public/assets/fonts/$f-subset.woff2"
  [ -f "$src" ] || { echo "건너뜀 (원본 없음): $src"; continue; }
  "$PY" -m fontTools.subset "$src" \
    --text="$CHARS" --layout-features='*' --flavor=woff2 --output-file="$out"
  printf "%-14s %6s KB → %5s KB\n" "$f" \
    "$(( $(stat -c%s "$src") / 1024 ))" "$(( $(stat -c%s "$out") / 1024 ))"
done
