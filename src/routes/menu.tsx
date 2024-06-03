import React from "react";

interface MenuItem {
  menu: string;
  price: number | string | null;
}

interface MenuCategory {
  kind: string;
  items: MenuItem[];
}

interface MenuData {
  pasta: MenuCategory[];
  rice: MenuCategory[];
  toast: MenuCategory[];
  dorm: MenuCategory[];
  schoolMeal: MenuCategory[];
}

interface CardProps {
  title: string;
  data: MenuCategory[];
}

const menuData: MenuData = {
  pasta: [
    {
      kind: "PASTA",
      items: [
        { menu: "크림 양송이 스파게티", price: 5.5 },
        { menu: "까르보나라 스파게티", price: 6.5 },
        { menu: "매운 까르보나라 스파게티", price: 7.1 },
        { menu: "크림치킨 스파게티", price: 6.9 },
        { menu: "크림고추새우 스파게티", price: 7.4 },
        { menu: "매운로제 스파게티", price: 8.5 },
        { menu: "미트소스 스파게티", price: 5.5 },
        { menu: "토마토소스 스파게티", price: 5.9 },
        { menu: "토마토치킨 스파게티", price: 6.4 },
        { menu: "아마트리치아나 스파게티", price: 6.9 },
        { menu: "알리오올리오 스파게티", price: 5.0 },
        { menu: "봉골레 스파게티", price: 5.0 },
        { menu: "중화짜장 스파게티", price: 6.0 },
        { menu: "마라크림 스파게티", price: 6.5 },
      ],
    },
  ],
  rice: [
    {
      kind: "식사류",
      items: [
        { menu: "김치찌개", price: 5.9 },
        { menu: "소고기오므라이스", price: 5.9 },
        { menu: "숯불소고기 덮밥", price: 6.9 },
        { menu: "직화닭덮밥", price: 5.9 },
        { menu: "매운돼지갈비덮밥", price: 5.9 },
        { menu: "두부추덮밥", price: 5.4 },
        { menu: "묵은지참지덮밥", price: 5.7 },
        { menu: "참치두부덮밥", price: 5.7 },
        { menu: "된장두부삼겹덮밥", price: 5.9 },
      ],
    },
  ],
  toast: [
    {
      kind: "SANDWICH",
      items: [
        { menu: "오늘의음료수 샌드위치", price: 3.8 },
        { menu: "오늘의과일 샌드위치", price: 4.1 },
        { menu: "더블햄치즈에그 샌드위치", price: 4.5 },
        { menu: "닭가슴살 샌드위치", price: 4.5 },
        { menu: "치킨텐더 샌드위치", price: 4.5 },
      ],
    },
    {
      kind: "SALAD",
      items: [
        { menu: "에그단호박 샐러드", price: 4.9 },
        { menu: "닭가슴살 샐러드", price: 4.9 },
        { menu: "마늘우삼겹 샐러드", price: 5.5 },
        { menu: "치킨텐더 샐러드", price: 5.5 },
        { menu: "마늘새우 샐러드", price: 6.0 },
        { menu: "야채토핑", price: "공통" },
      ],
    },
    {
      kind: "TOAST",
      items: [
        { menu: "햄치즈 토스트", price: 3.0 },
        { menu: "햄치즈야채 토스트", price: 3.2 },
        { menu: "베이컨 토스트", price: 3.5 },
        { menu: "불갈비 토스트(매콤)", price: 4.2 },
      ],
    },
    {
      kind: "HOTDOG",
      items: [
        { menu: "플레인 핫도그", price: 3.6 },
        { menu: "콘치즈핫도그", price: 4.0 },
        { menu: "스위트어니언 핫도그", price: 4.0 },
        { menu: "스위트 불고기 핫도그", price: 4.2 },
      ],
    },
    {
      kind: "SIDE",
      items: [
        { menu: "컵과일", price: 3.0 },
        { menu: "컵어묵", price: 1.0 },
        { menu: "그래과일", price: 3.9 },
        { menu: "타코야끼", price: 3.0 },
        { menu: "그래초코", price: 3.9 },
        { menu: "탄산음료", price: 1.5 },
      ],
    },
  ],
  dorm: [
    {
      kind: "조식",
      items: [
        { menu: "시금치 된장국", price: 4.9 },
        { menu: "샌드위치", price: 4.9 },
      ],
    },
    {
      kind: "중식",
      items: [{ menu: "참치김치덮밥", price: 4.9 }],
    },
    {
      kind: "석식",
      items: [{ menu: "*특식", price: 9.8 }],
    },
  ],
  schoolMeal: [
    {
      kind: "학생식당",
      items: [
        { menu: "열무 물냉면", price: 4.5 },
        { menu: "진국수육국밥", price: 6.5 },
        { menu: "진국순대국밥", price: 6.5 },
      ],
    },
    {
      kind: "교직원식당",
      items: [{ menu: "콩나물밥 양념장", price: 6.0 }],
    },
    {
      kind: "추가메뉴",
      items: [
        { menu: "즉석떡볶이", price: null },
        { menu: "즉석라면", price: null },
      ],
    },
    {
      kind: "바비든든",
      items: [
        { menu: "삼겹소금(싱글)", price: 3.3 },
        { menu: "삼겹소금(더블)", price: 4.3 },
        { menu: "삼겹소금(점보)", price: 5.3 },
        { menu: "삼겹양념(싱글)", price: 3.3 },
        { menu: "삼겹양념(더블)", price: 4.3 },
        { menu: "삼겹양념(점보)", price: 5.3 },
        { menu: "참치마요(싱글)", price: 3.3 },
        { menu: "참치마요(더블)", price: 4.3 },
        { menu: "참치마요(점보)", price: 5.3 },
      ],
    },
  ],
};

const Card: React.FC<CardProps> = ({ title, data }) => (
  <div className="p-6 border border-gray-300 rounded-lg shadow-md mb-6">
    <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>
    <div>
      {data.map((category, index) => (
        <div key={index} className="mb-4">
          <h4 className="font-semibold mb-2">{category.kind}</h4>
          {category.items.map((item, itemIndex) => (
            <div key={itemIndex} className="flex justify-between">
              <span>{item.menu}</span>
              <span>{item.price !== null ? item.price : ""}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

interface MenuSectionProps {
  title: string;
  data: {
    [key: string]: MenuCategory[];
  };
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, data }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-semibold mb-8">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Object.entries(data).map(([key, value]) => (
        <Card key={key} title={key} data={value} />
      ))}
    </div>
  </div>
);

const Menu: React.FC = () => (
  <div className="container mx-auto p-8 bg-gray-50">
    <div className="text-center mb-12">
      <img src="path/to/logo.png" alt="logo" className="mx-auto mb-4" />
      <h1 className="text-3xl font-bold">학식메뉴확인</h1>
    </div>
    <MenuSection title="어문학관" data={{ pasta: menuData.pasta, toast: menuData.toast, rice: menuData.rice }} />
    <MenuSection title="후생관" data={{ 후생관식당: menuData.schoolMeal }} />
    <MenuSection title="기숙사식당" data={{ HUFSDORM: menuData.dorm }} />
  </div>
);

export default Menu;
