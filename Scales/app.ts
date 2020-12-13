import Product from './models/Product';
import Apple from './models/Apple';
import Tomato from './models/Tomato';
import Scale from './Scale';

const prodcts: Product[] = [
    new Apple('Gala', 100),
    new Apple('Fuji', 303), 
    new Apple('McIntosh', 201), 
    new Tomato('Полудетерминантные', 155),
    new Tomato('Среднеранние ', 400)
];

const scale: Scale = new Scale();

scale.addRange(prodcts);
scale.add(new Tomato('Штамбовые ', 210));
scale.add(new Apple('Red Delicious ', 137));
scale.add(new Apple('McIntosh', 130));
scale.add(new Apple('McIntosh', 325));

console.log(`List names: ${scale.getNameList()};`);
console.log(`Total scales: ${scale.getSumScale()};`);
console.log(`McIntosh scales: ${scale.getSumScale('McIntosh')};`);