const { Category, Size, Manufacturer, Attribute, Expense, ExpensesCategory, User, UserAddress, Product, ProductSize, ProductAttribute, Order, OrderProduct} = require('../models');
const csv = require('csv-parser')
const fs = require('fs')
const { faker } = require('@faker-js/faker');

class DatabaseImport {

    async importDatabase(req, res, next) {
        try {
            const  readExpensesCategoriesData = () => {
                return new Promise((resolve, reject) => {
                    const results = [];
                    fs.createReadStream('expenses_categories.csv')
                        .pipe(csv())
                        .on('data', async (data) => {
                            try {
                                await ExpensesCategory.create({
                                    category: data.category,
                                });
                                results.push(data);
                            } catch (error) {
                                reject(error);
                            }
                        })
                        .on('end', () => {
                            resolve(results);
                        })
                        .on('error', (error) => {
                            reject(error);
                        });
                });
            }

            const  readSizesData = () => {
                return new Promise((resolve, reject) => {
                    const results = [];
                    fs.createReadStream('sizes.csv')
                        .pipe(csv())
                        .on('data', async (data) => {
                            try {
                                await Size.create({
                                    name: data.name,
                                });
                                results.push(data);
                            } catch (error) {
                                reject(error);
                            }
                        })
                        .on('end', () => {
                            resolve(results);
                        })
                        .on('error', (error) => {
                            reject(error);
                        });
                });
            }


            const  readManufacturersData = () => {
                return new Promise((resolve, reject) => {
                    const results = [];
                    fs.createReadStream('manufacturers.csv')
                        .pipe(csv())
                        .on('data', async (data) => {
                            try {
                                await Manufacturer.create({
                                    name: data.name,
                                });
                                results.push(data);
                            } catch (error) {
                                reject(error);
                            }
                        })
                        .on('end', () => {
                            resolve(results);
                        })
                        .on('error', (error) => {
                            reject(error);
                        });
                });
            }

            const readAttributesData = () => {
                return new Promise((resolve, reject) => {
                    const results = [];
                    fs.createReadStream('attributes.csv')
                        .pipe(csv())
                        .on('data', async (data) => {
                            try {
                                await Attribute.create({
                                    name: data.name,
                                });
                                results.push(data);
                            } catch (error) {
                                reject(error);
                            }
                        })
                        .on('end', () => {
                            resolve(results);
                        })
                        .on('error', (error) => {
                            reject(error);
                        });
                });
            }

            const readProductsData = (fileName, category, image) => {
                return new Promise((resolve, reject) => {
                    const results = [];
                    fs.createReadStream(fileName)
                        .pipe(csv())
                        .on('data', async (data) => {
                            try {
                                const manufacturerList = await Manufacturer.findAll();
                                const sizesList = await Size.findAll(); 
                                const sizesCount = await Size.count();

                                const attributesList = await Attribute.findAll(); 
                                const attributesCount = await Attribute.count();
                                const materials = ['Cotton', 'Denim', 'Velvet', 'Linen', 'Polyestr', 'Leather', 'Silk', 'Wool'];

                                const product = await Product.create({
                                    name: data.Product_Name,
                                    description: data.Details,
                                    price: faker.commerce.price({ min: 5, max: 200, dec: 2 }),
                                    SKU: faker.commerce.isbn(10),
                                    image_url: image,
                                    CategoryId: category,
                                    ManufacturerId: manufacturerList[faker.number.int({min: 0, max: manufacturerList.length - 1})].id,
                                    quantity: 0,
                                });

                                for (let j = 0; j < sizesCount; ++j) {
                                    const productSize = await ProductSize.create({
                                        quantity: faker.number.int({min: 50, max: 100}),
                                        sizeId: sizesList[j].id,
                                        productId: product.id,
                                    })
                                }


                                for (let j = 0; j < attributesCount; ++j) {
                                    if(attributesList[j].name === 'Color') {
                                        const productAttribute = await ProductAttribute.create({
                                            value: faker.color.human(),
                                            attributeId: attributesList[j].id,
                                            productId: product.id,
                                        })
                                    }
                                    if(attributesList[j].name === 'Material') {
                                        const productAttribute = await ProductAttribute.create({
                                            value: materials[faker.number.int({min: 0, max: manufacturerList.length - 1})],
                                            attributeId: attributesList[j].id,
                                            productId: product.id,
                                        })
                                    }
                                }

                                results.push(data);
                            } catch (error) {
                                reject(error);
                            }
                        })
                        .on('end', () => {
                            resolve(results);
                        })
                        .on('error', (error) => {
                            reject(error);
                        });
                });
            }

            await readExpensesCategoriesData();
            await readSizesData();
            await readManufacturersData();
            await readAttributesData();

            // expenses
            const expensesCategoryList = await ExpensesCategory.findAll();
            const expensesCount = 300;
            for (let i = 0; i < expensesCount; ++i) {
                await Expense.create({
                    date: faker.date.between({from: '2023-04-22T00:00:00', to: '2024-05-01T00:00:00'}),
                    amount: faker.finance.amount({ min: 5, max: 500, dec: 2 }),
                    ExpensesCategoryId: expensesCategoryList[faker.number.int({min: 0, max: expensesCategoryList.length - 1})].id, 
                });
            }

            //  users
            const userCount = 200;
            for (let i = 0; i < userCount; ++i) {
                const userAddress = await UserAddress.create({
                    address: faker.location.streetAddress(),
                    city: faker.location.city(),
                    country: faker.location.country(),
                    zipcode: faker.location.zipCode(),
                })
                
                const first_name = faker.person.firstName();
                const last_name = faker.person.lastName();

                await User.create({
                    first_name: first_name,
                    last_name: last_name,
                    email: faker.internet.email({ firstName: first_name, lastName: last_name, provider: 'gmail.com' }),
                    password: faker.internet.password({ length: 8 }),
                    is_admin: false,
                    UserAddressId: userAddress.id,
                })
            }

            // await readProductsData('BLAZERS.csv', 16, '');
            await readProductsData('women/DRESSES.csv', 13, 'b5279e7a-710c-4f40-911c-26f9ac012abf.jpg');
            // await readProductsData('JACKETS.csv', 17, '');
            await readProductsData('women/JEANS.csv', 12, 'c8e43bf1-8693-4361-8164-56328bcf92ef.jpg');
            // await readProductsData('women/KNITWEAR.csv', 18, 'b674132774c840f50e6e54158f61897f.jpg');
            await readProductsData('women/SHIRTS.csv', 15, 'cfb5b063-c239-40e6-9036-4048ffb32bdb.jpg');
            // await readProductsData('SHORTS.csv', 19, '');
            // await readProductsData('SKIRTS.csv', 14, '');
            await readProductsData('women/T-SHIRTS.csv', 10, '9e7cf670-8d3d-4533-861a-f6c308987dd2.jpg');
            await readProductsData('women/TOPS.csv', 11, '66c99606-3ef2-4366-ba24-32fa45958f2d.jpg');
            await readProductsData('women/TROUSERS.csv', 20, '5542abd7-20e3-4512-b3fd-22f2ee4bf565.jpg');
            // await readProductsData('women/WAISTCOATS.csv', 21, 'b674132774c840f50e6e54158f61897f.jpg');

            const userList = await User.findAll();
            const productList = await Product.findAll();

            const ordersCount = 200;
            const userId = userList[faker.number.int({min: 0, max: userList.length - 1})].id;

            for (let i = 0; i < ordersCount; ++i) {
                const order = await Order.create({
                    date: faker.date.between({from: '2023-04-22T00:00:00', to: '2024-05-01T00:00:00'}),
                    total_amount: 0,
                    status: 'Completed',
                    UserId: userId,
                })

                const randomCount = faker.number.int({min: 1, max: 7});

                for(let j = 0; j < randomCount; ++j) {
                    const orderProduct = await OrderProduct.create({
                        amount: faker.date.between({from: '2023-04-22T00:00:00', to: '2024-05-01T00:00:00'}),
                        quantity: 0,
                        OrderId: order.id,
                        ProductId: 'Completed',
                        UserId: userId,
                    })
                }
                
                const first_name = faker.person.firstName();
                const last_name = faker.person.lastName();

                await User.create({
                    first_name: first_name,
                    last_name: last_name,
                    email: faker.internet.email({ firstName: first_name, lastName: last_name, provider: 'gmail.com' }),
                    password: faker.internet.password({ length: 8 }),
                    is_admin: false,
                    UserAddressId: userAddress.id,
                })
            }


            // Відправка успішного повідомлення, якщо операція завершилась успішно
            res.status(200).json({ message: 'Data imported successfully' });
        } catch (error) {
            // Обробка помилок
            console.error('Error importing data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    
}

module.exports = new DatabaseImport();
