// Tạo ảnh placeholder (SVG) – khi có ảnh thật chỉ cần điền `src`
export const placeholder = (label, w = 800, h = 1000) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='#fbcfe8'/><stop offset='1' stop-color='#f9a8d4'/>
      </linearGradient></defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle'
        font-family='sans-serif' font-size='${Math.round(w / 14)}' fill='white'>${label}</text>
    </svg>`,
  )}`;

export const hero = {
  greeting: "Gửi người con gái anh thương,",
  scriptLine: "Chúc mừng ngày",
  bigText: "20/10",
  subtitle:
    "Cảm ơn em vì đã dịu dàng, kiên nhẫn và ở bên anh mỗi ngày. Mong em luôn rạng rỡ như đóa hoa này.",
  cta: "Mở thư của anh",
};

export const letter = {
  greeting: "Gửi Sona của anh,",
  paragraphs: [
    "Hôm nay là ngày phụ nữ Việt Nam 20/10, anh muốn dành những lời yêu thương nhất gửi đến em, người con gái mà anh rất yêu.",
    "Cảm ơn em vì đã luôn yêu anh, luôn tin tưởng anh, luôn quan tâm đến những điều nhỏ nhặt nhất và cùng anh phát triển để trở thành 1 phiên bản tốt hơn mỗi ngày.",
    "Tuy rằng anh chưa thể ở cạnh em ngày hôm nay, nhưng anh mong món quà nhỏ này sẽ thay 1 phần nào đó tấm lòng cụa anh gửi đến em.",
    "Chúc em một ngày 20/10 thật rạng rỡ, luôn khỏe mạnh, luôn bình yên và luôn mỉm cười thật nhiều như mỗi khi em ở cạnh anh.",
  ],
  closing: "Anh bé yêu em,",
  signature: "Diệp Anh",
};

// Có ảnh thật: đặt vào public/photos/ rồi điền src: '/photos/1.jpg'
// w/h chỉ dùng để chia tỉ lệ khung ảnh (vd 4:5, 1:1, 3:4...)
export const gallery = {
  title: "Những khoảnh khắc của chúng mình",
  subtitle: "Mỗi bức ảnh là một mảnh ký ức anh luôn trân trọng",
  photos: [
    {
      src: "./img/pic1.jpg",
      w: 800,
      h: 900,
      caption: "Lần đầu đi chơi với nhau",
      date: "29/06/2025",
    },
    {
      src: "./img/pic4.jpg",
      w: 800,
      h: 800,
      caption: "Đi photobooth nèee",
      date: "25/04/2026",
    },
    {
      src: "./img/pic2.jpg",
      w: 2000,
      h: 1500,
      caption: "Đi picnic với nhauu",
      date: "19/10/2025",
    },
    {
      src: "./img/pic5.jpg",
      w: 800,
      h: 900,
      caption: "Đi camping với elmm",
      date: "27/04/2026",
    },
    {
      src: "./img/pic3.jpg",
      w: 800,
      h: 800,
      caption: "Đi chụp hình Tết, ngày đầu tiên bọn mình chính thức quen nhau",
      date: "09/02/2026",
    },
    {
      src: "./img/pic6.jpg",
      w: 800,
      h: 800,
      caption: "Anni 8 tháng và còn nữa :>",
      date: "09/10/2026",
    },
  ].map((p, i) => ({
    ...p,
    src: p.src ?? placeholder(`Ảnh ${i + 1}`, p.w, p.h),
  })),
};

export const footerText =
  "Lời kết cuối, anh chỉ muốn nói là Anh Yêu Em Rất Rất Nhìuuu !!!";
