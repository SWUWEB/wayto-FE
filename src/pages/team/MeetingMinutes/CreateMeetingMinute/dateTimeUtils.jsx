// 날짜/시간을 한국 형식으로 변환하는 함수
export const formatKoreanDateTime = (date, time) => {
  const dateObj = new Date(`${date}T${time}`);
  
  // 요일 배열
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  
  // 년.월.일 형식
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const weekday = weekdays[dateObj.getDay()];
  
  // 오전/오후 시:분 형식
  let hours = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const period = hours < 12 ? '오전' : '오후';
  
  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours = hours - 12;
  }
  
  const formattedHours = String(hours).padStart(2, '0');
  
  return `${year}.${month}.${day} ${weekday} ${period} ${formattedHours}:${minutes}`;
};

// 현재 날짜/시간을 기본값으로 가져오는 함수
export const getDefaultDateTime = () => {
  const now = new Date();
  const defaultDate = now.toISOString().slice(0, 10);
  const defaultTime = now.toTimeString().slice(0, 5);
  
  return { defaultDate, defaultTime };
};