const $c = document.querySelector("canvas");
const ctx = $c.getContext(`2d`);
const menuAdd = document.querySelector('#menuAdd');
const product = [];
const colors = [];

const newMake = () => {
  const [cw, ch] = [$c.width / 2, $c.height / 2];
  const arc = Math.PI / (product.length / 2);  
  for (let i = 0; i < product.length; i++) {
    // 색상과 경계선을 추가하여 섹션을 그림
    ctx.beginPath();

    // 각 섹션의 배경색 설정
    ctx.fillStyle = "#f9f9f9";
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
    ctx.fill(); // 내부 색상 채우기

    // 경계선 그리기
    ctx.lineWidth = 3; // 경계선 두께 설정
    ctx.strokeStyle = "#000"; // 경계선 색상 설정 (검정색)
    ctx.stroke(); // 경계선 그리기
    ctx.closePath();
  }

  ctx.fillStyle = "#000";
  ctx.font = "32px Pretendard";
  ctx.textAlign = "center";

  for (let i = 0; i < product.length; i++) {
    const angle = (arc * i) + (arc / 2);

    ctx.save();

    ctx.translate(
      cw + Math.cos(angle) * (cw - 50),
      ch + Math.sin(angle) * (ch - 50)
    );

    ctx.rotate(angle + Math.PI / 2);

    product[i].split(" ").forEach((text, j) => {
      ctx.fillText(text, 0, 30 * j);
    });

    ctx.restore();
  }
}

const rotate = () => {
  $c.style.transform = `initial`;
  $c.style.transition = `initial`;
  const alpha = Math.floor(Math.random()*100);

  setTimeout(() => {    
    const ran = Math.floor(Math.random() * product.length);
    const arc = 360 / product.length;
    const rotate = (ran * arc) + 3600 + (arc * 3) - (arc/4) + alpha;
    $c.style.transform = `rotate(-${rotate}deg)`;
    $c.style.transition = `2s`;
    
    setTimeout(() => {
    highlightSelectedSection(ran); // 선택된 섹션을 강조하는 함수 호출
    }, 2000); // 애니메이션이 2초간 지속되므로 그 후에 실행

  }, 1);
};

const highlightSelectedSection = (selectedIndex) => {
    const [cw, ch] = [$c.width / 2, $c.height / 2]; // 캔버스 중심 좌표
    const arc = Math.PI / (product.length / 2);  // 각 섹션의 각도 계산
  
    ctx.clearRect(0, 0, $c.width, $c.height); // 캔버스를 지우고 다시 그리기
  
    // 모든 섹션을 다시 그리되, 선택된 섹션은 강조
    for (let i = 0; i < product.length; i++) {
      ctx.beginPath();
  
      // 선택된 섹션은 강조 색상 (예: 빨간색), 나머지는 기본 색상 (흰색)
      ctx.fillStyle = (i === selectedIndex) ? "#FFFFFF" : "#000000"; // 선택된 섹션은 빨간색, 나머지는 흰색
  
      ctx.moveTo(cw, ch);
      ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
      ctx.fill(); // 내부 색상 채우기
  
      // 경계선 그리기
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#000"; // 경계선은 검정색
      ctx.stroke();
      ctx.closePath();
    }
  
    // 텍스트 다시 그리기
    ctx.fillStyle = "#000"; // 텍스트 색상 검정
    ctx.font = "32px Pretendard";
    ctx.textAlign = "center";
  
    for (let i = 0; i < product.length; i++) {
      const angle = (arc * i) + (arc / 2);
  
      ctx.save();
  
      ctx.translate(
        cw + Math.cos(angle) * (cw - 50),
        ch + Math.sin(angle) * (ch - 50)
      );
  
      ctx.rotate(angle + Math.PI / 2);
  
      product[i].split(" ").forEach((text, j) => {
        ctx.fillText(text, 0, 30 * j); // 텍스트 그리기
      });
  
      ctx.restore();
    }
  };


function add(){
    if (menuAdd.value != undefined && menuAdd.value != "") {
        //쉼표를 기준으로 입력값을 나누고, 각 요소의 앞뒤 공백 제거 후 product에 추가
        const newItems = menuAdd.value.split(',').map(item => item.trim());
    
        newItems.forEach(item => {
          if (item) { // 빈 항목이 아닌 경우만 추가
            product.push(item);
    
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            colors.push("rgb(" + r + "," + g + "," + b + ")");
          }
        });
    
        newMake();
    
        menuAdd.value = "";
      } else {
        alert("입력한 후 버튼을 클릭 해 주세요");
      }
    }

function delete_all(){
    product.length = 0;
    colors.length = 0;
    
    ctx.clearRect(0, 0, $c.width, $c.height);
}

newMake();