import shoes from "../../public/crousal/shoes.jpg";
import mens from "../../public/images/cplusplus.jpg";
import kids from "../../public/crousal/kids.webp";
import womens from "../../public/crousal/womens.jpg";
import WomensSunglasses from "../../public/images/WomensSunglasses.jpeg";

const Header = () => {
  return (
    <div className="p-2">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-100 col-start-1 col-end-4">
          <img src={shoes} alt="Shoes" className="w-full h-full" />
        </div>
        <div className="bg-gray-100">
          <img src={kids} alt="kids" className="h-full object-cover" />
        </div>
        <div className="bg-gray-100">
          <img src={mens} alt="Men's" className="h-full w-full object-cover" />
        </div>
        <div className="bg-gray-100 col-span-2">
          <img
            src={womens}
            alt="womens"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-gray-100">
          <img
            src={WomensSunglasses}
            alt="WomensSunglasses"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
