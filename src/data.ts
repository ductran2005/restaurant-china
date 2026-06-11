/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FeaturedDish {
  id: string;
  name: string;
  vietnameseName: string;
  chineseName: string;
  description: string;
  imageUrl: string;
  details: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  englishName: string;
  description: string;
  // Beautiful SVG path or description of character
  character: string;
  imageUrl?: string;
  x: string; // original position x
  y: string; // original position y
  speed: number;
}

export const FEATURED_DISHES: FeaturedDish[] = [
  {
    id: "peking-duck",
    name: "Peking Duck",
    vietnameseName: "Vịt Quay Bắc Kinh",
    chineseName: "北京烤鴨",
    description: "Biểu tượng hoàng gia được chế tác qua 127 công đoạn nghiêm ngặt, sở hữu lớp da giòn như pha lê cùng thớ thịt ngọt mềm thấm đượm linh hồn thảo mộc hương.",
    imageUrl: "/images/peking-duck.webp",
    details: ["Gỗ đào cổ thụ 50 năm", "Kỹ thuật sấy da 24 giờ", "Cắt lát mỏng chuẩn 108 miếng"]
  },
  {
    id: "xiaolongbao",
    name: "Xiao Long Bao",
    vietnameseName: "Tiểu Long Bao",
    chineseName: "小籠包",
    description: "Nhỏ gọn nhưng chứa đựng tinh túy vĩ đại. Lớp vỏ mỏng xếp đúng 18 nếp gấp tinh xảo ôm trọn phần nước súp ngọt thanh chảy tràn nơi đầu lưỡi.",
    imageUrl: "/images/xiaolongbao.webp",
    details: ["Vỏ cán mỏng 1mm", "Đủ 18 nếp gấp tay", "Nhân nước súp hầm 12 tiếng"]
  },
  {
    id: "shanghai-dimsum",
    name: "Shanghai Dimsum",
    vietnameseName: "Dimsum Thượng Hải",
    chineseName: "上海點心",
    description: "Bản giao hưởng hương vị biển cả và đất trời. Mỗi viên dimsum là một tác phẩm điêu khắc nghệ thuật kết tinh từ đại dương trù phú và kỹ nghệ tạo hình thượng thừa.",
    imageUrl: "/images/shanghai-dimsum.webp",
    details: ["Bột lọc pha lê thượng hạng", "Nhân tôm hùm & nấm truffle", "Được hấp trong lồng tre sồi"]
  },
  {
    id: "lanzhou-noodles",
    name: "Lanzhou Noodles",
    vietnameseName: "Mì Kéo Tay Lan Châu",
    chineseName: "蘭州牛肉麵",
    description: "Vũ điệu của bột và lực. Những sợi mì sinh ra từ chuyển động nhịp nhàng, kéo dãn đầy quyền uy, kết hợp cùng nước dùng trong vắt thanh tao ninh từ xương bò thảo quả.",
    imageUrl: "/images/lanzhou-noodles.webp",
    details: ["Nhào nặn thủ công 100%", "9 kích cỡ sợi từ dẹt đến tròn", "Thảo dược độc quyền từ Lan Châu"]
  }
];

export const INGREDIENTS: Ingredient[] = [
  {
    id: "star-anise",
    name: "Hoa Hồi",
    englishName: "Star Anise",
    description: "Hương vị nồng ấm mang mác thảo mộc phương Đông, linh hồn tạo nên hương thơm đặc trưng ngấm vào từng thớ thịt vịt quay.",
    character: "八角",
    imageUrl: "/images/ingredients/star-anise.webp",
    x: "15%",
    y: "25%",
    speed: 1.5
  },
  {
    id: "cinnamon",
    name: "Quế",
    englishName: "Cinnamon",
    description: "Vị ngọt nhẹ kèm chút cay dịu, kích thích giác quan và giữ hơi ấm nồng nàn truyền thống cho nước sốt hoàng gia.",
    character: "肉桂",
    imageUrl: "/images/ingredients/cinnamon.webp",
    x: "80%",
    y: "20%",
    speed: 1.8
  },
  {
    id: "ginger",
    name: "Gừng",
    englishName: "Ginger",
    description: "Chất cay thanh lọc và cân bằng tính hàn của ẩm thực, đánh thức toàn bộ các tế bào cảm thụ vị giác trên lưỡi.",
    character: "薑",
    imageUrl: "/images/ingredients/ginger.webp",
    x: "20%",
    y: "75%",
    speed: 1.2
  },
  {
    id: "scallion",
    name: "Hành Lá",
    englishName: "Scallion",
    description: "Vị hăng nhẹ giòn tan, thanh tao dùng kèm lát vịt quay quết tương ngọt để giải phóng độ béo ngậy cực đỉnh.",
    character: "蔥",
    imageUrl: "/images/ingredients/scallion.webp",
    x: "75%",
    y: "70%",
    speed: 2.2
  },
  {
    id: "sweet-bean-sauce",
    name: "Tương Đậu",
    englishName: "Sweet Bean Sauce",
    description: "Gia vị hoàng kim cổ truyền ủ lên men, sánh đặc, ngọt thơm đậm đà nâng tầm trải nghiệm tinh túy của Vịt Bắc Kinh.",
    character: "甜麵醬",
    imageUrl: "/images/ingredients/sweet-bean-sauce.webp",
    x: "50%",
    y: "80%",
    speed: 1.4
  }
];

export const STORY_PARAGRAPHS = [
  {
    title: "Di Sản Hoàng Gia",
    subtitle: "Thiết kế cho bậc Đế vương",
    content: "Vịt quay Bắc Kinh không đơn thuần là món ăn, đó là nghi lễ phục vụ hoàng gia có nguồn gốc từ triều đại nhà Nguyên và hoàn thiện dưới thời nhà Thanh. Mỗi chú vịt được tuyển chọn gắt gao, nuôi dưỡng trong điều kiện đặc chủng để cam kết tỷ lệ mỡ-thịt đạt tiêu chuẩn vàng."
  },
  {
    title: "127 Giờ Chế Tác",
    subtitle: "Khổ luyện tạo nên kiệt tác",
    content: "Từ khâu thổi khí tách da, rưới mạch nha, sấy lạnh liên tục trong 24 giờ cho đến quá trình nướng bằng củi gỗ đào cổ thụ trong lò kín. Lửa phải được giữ ở mức nhiệt ổn định để mỡ vịt tự tan chảy, quét đều lên lớp da ngoài tạo nên màu đỏ hổ phách lộng lẫy và độ giòn độc nhất vô nhị."
  },
  {
    title: "Nghi Thức Thưởng Thức",
    subtitle: "Chạm vào đỉnh cao ngũ quan",
    content: "Được dâng lên bàn tiệc bởi người nghệ nhân thái lát (Carving Master). Mỗi chú vịt được chia cắt chính xác thành 108 miếng mỏng gồm cả da và thịt. Thưởng thức lát da giòn rụm đầu tiên chấm nhẹ chút đường cát tinh luyện để cảm nhận sự bùng nổ tan chảy kỳ diệu nơi vòm họng."
  }
];
