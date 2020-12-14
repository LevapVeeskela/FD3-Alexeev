import IScalable from './interfaces/IScalable';
import Product from './models/Product';
import Scale from './Scale';
import ScalesStorageEngineArray from './stores/ScalesStorageEngineArray';
import ScalesStorageEngineLocalStorage from './stores/ScalesStorageEngineLocalStorage';
import Factory from './factory';
const prodcts: Product[] = [
    new Product('Gala', 100),
    new Product('Fuji', 303), 
    new Product('McIntosh', 201), 
    new Product('Полудетерминантные', 155),
    new Product('Среднеранние', 400)
];

const firstScale: Scale<ScalesStorageEngineArray<IScalable>> = new Scale(Factory(ScalesStorageEngineArray));
const secondScale: Scale<ScalesStorageEngineLocalStorage<IScalable>> = new Scale(Factory(ScalesStorageEngineLocalStorage));

firstScale.add(prodcts);
firstScale.add(new Product('Штамбовые', 210));
firstScale.add(new Product('Red Delicious', 137));
firstScale.add(new Product('McIntosh', 130));
firstScale.add(new Product('McIntosh', 325));

secondScale.add(prodcts);
secondScale.add(new Product('Red Delicious', 333));

console.log(`List names first store: ${firstScale.getNameList()};`);
console.log(`Total scales: ${firstScale.getSumScale()};`);

console.log(`List names second store: ${secondScale.getNameList()};`);
console.log(`Total scales: ${secondScale.getSumScale()};`);

