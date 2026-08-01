// Reference list of ~50 of Malaysia's best-selling car nameplates (2024-2026), broken out by
// engine/motor variant where it affects road tax. Sourced from manufacturer spec sheets and
// paultan.org/autobuzz.my launch coverage -- NOT an official JPJ/MyJPJ database. Always confirm
// against your vehicle registration card (geran) for the exact figure.
//
// fuel: 'petrol' | 'diesel' (both taxed on the cc-based schedule) | 'ev' (taxed on kW)
// body: 'saloon' (sedan/hatch/coupe) | 'nonsaloon' (SUV/MPV/pickup/van)
// approx: true if the kW figure is a reasonable estimate rather than a directly-confirmed spec
const CAR_DATABASE = [
    // Perodua
    { make: 'Perodua', model: 'Axia', variant: '1.0L', fuel: 'petrol', cc: 998, body: 'saloon' },
    { make: 'Perodua', model: 'Bezza', variant: '1.0L', fuel: 'petrol', cc: 998, body: 'saloon' },
    { make: 'Perodua', model: 'Bezza', variant: '1.3L', fuel: 'petrol', cc: 1329, body: 'saloon' },
    { make: 'Perodua', model: 'Myvi', variant: '1.3L', fuel: 'petrol', cc: 1329, body: 'saloon' },
    { make: 'Perodua', model: 'Myvi', variant: '1.5L', fuel: 'petrol', cc: 1496, body: 'saloon' },
    { make: 'Perodua', model: 'Alza', variant: '1.5L', fuel: 'petrol', cc: 1496, body: 'nonsaloon' },
    { make: 'Perodua', model: 'Aruz', variant: '1.5L', fuel: 'petrol', cc: 1496, body: 'nonsaloon' },
    { make: 'Perodua', model: 'Ativa', variant: '1.0L Turbo', fuel: 'petrol', cc: 998, body: 'nonsaloon' },
    { make: 'Perodua', model: 'Traz', variant: '1.5L', fuel: 'petrol', cc: 1496, body: 'nonsaloon' },

    // Proton
    { make: 'Proton', model: 'Saga', variant: '1.3L', fuel: 'petrol', cc: 1332, body: 'saloon' },
    { make: 'Proton', model: 'Saga', variant: '1.5L (MC3)', fuel: 'petrol', cc: 1499, body: 'saloon' },
    { make: 'Proton', model: 'Iriz', variant: '1.6L', fuel: 'petrol', cc: 1597, body: 'saloon' },
    { make: 'Proton', model: 'Persona', variant: '1.6L', fuel: 'petrol', cc: 1597, body: 'saloon' },
    { make: 'Proton', model: 'S70', variant: '1.5L Turbo', fuel: 'petrol', cc: 1477, body: 'saloon' },
    { make: 'Proton', model: 'X50', variant: '1.5L Turbo', fuel: 'petrol', cc: 1477, body: 'nonsaloon' },
    { make: 'Proton', model: 'X70', variant: '1.5L Turbo', fuel: 'petrol', cc: 1477, body: 'nonsaloon' },
    { make: 'Proton', model: 'X70', variant: '1.8L Turbo', fuel: 'petrol', cc: 1798, body: 'nonsaloon' },
    { make: 'Proton', model: 'X90', variant: '1.5L Turbo Hybrid', fuel: 'petrol', cc: 1499, body: 'nonsaloon' },
    { make: 'Proton', model: 'e.MAS 5', variant: 'Prime', fuel: 'ev', kw: 58, body: 'saloon' },
    { make: 'Proton', model: 'e.MAS 5', variant: 'Premium', fuel: 'ev', kw: 85, body: 'saloon' },
    { make: 'Proton', model: 'e.MAS 7', variant: 'Prime', fuel: 'ev', kw: 160, body: 'nonsaloon' },
    { make: 'Proton', model: 'e.MAS 7', variant: 'Premium', fuel: 'ev', kw: 160, body: 'nonsaloon' },

    // Honda
    { make: 'Honda', model: 'City', variant: '1.5L', fuel: 'petrol', cc: 1497, body: 'saloon' },
    { make: 'Honda', model: 'Civic', variant: '1.5L Turbo', fuel: 'petrol', cc: 1498, body: 'saloon' },
    { make: 'Honda', model: 'HR-V', variant: '1.5L Turbo', fuel: 'petrol', cc: 1498, body: 'nonsaloon' },
    { make: 'Honda', model: 'WR-V', variant: '1.5L', fuel: 'petrol', cc: 1498, body: 'nonsaloon' },
    { make: 'Honda', model: 'CR-V', variant: '1.5L Turbo / Hybrid', fuel: 'petrol', cc: 1498, body: 'nonsaloon' },

    // Toyota
    { make: 'Toyota', model: 'Vios', variant: '1.5L', fuel: 'petrol', cc: 1496, body: 'saloon' },
    { make: 'Toyota', model: 'Yaris', variant: '1.5L', fuel: 'petrol', cc: 1496, body: 'saloon' },
    { make: 'Toyota', model: 'Veloz', variant: '1.5L', fuel: 'petrol', cc: 1496, body: 'nonsaloon' },
    { make: 'Toyota', model: 'Corolla Cross', variant: '1.8L / Hybrid', fuel: 'petrol', cc: 1798, body: 'nonsaloon' },
    { make: 'Toyota', model: 'Harrier', variant: '2.0L', fuel: 'petrol', cc: 1987, body: 'nonsaloon' },
    { make: 'Toyota', model: 'Vellfire', variant: '2.5L', fuel: 'petrol', cc: 2494, body: 'nonsaloon' },
    { make: 'Toyota', model: 'Alphard', variant: '2.4L Turbo', fuel: 'petrol', cc: 2393, body: 'nonsaloon' },
    { make: 'Toyota', model: 'Hilux', variant: '2.4L Diesel', fuel: 'diesel', cc: 2393, body: 'nonsaloon' },
    { make: 'Toyota', model: 'Hilux', variant: '2.8L Diesel', fuel: 'diesel', cc: 2755, body: 'nonsaloon' },
    { make: 'Toyota', model: 'Fortuner', variant: '2.4L Diesel', fuel: 'diesel', cc: 2393, body: 'nonsaloon' },
    { make: 'Toyota', model: 'Fortuner', variant: '2.8L Diesel', fuel: 'diesel', cc: 2755, body: 'nonsaloon' },

    // Nissan
    { make: 'Nissan', model: 'Almera', variant: '1.0L Turbo', fuel: 'petrol', cc: 999, body: 'saloon' },
    { make: 'Nissan', model: 'Serena', variant: '2.0L', fuel: 'petrol', cc: 1997, body: 'nonsaloon' },
    { make: 'Nissan', model: 'Serena', variant: 'e-Power 1.4L', fuel: 'petrol', cc: 1433, body: 'nonsaloon' },

    // Mitsubishi
    { make: 'Mitsubishi', model: 'Xpander', variant: '1.5L', fuel: 'petrol', cc: 1499, body: 'nonsaloon' },
    { make: 'Mitsubishi', model: 'Triton', variant: '2.4L Diesel', fuel: 'diesel', cc: 2442, body: 'nonsaloon' },

    // Mazda
    { make: 'Mazda', model: 'CX-5', variant: '2.0L', fuel: 'petrol', cc: 1998, body: 'nonsaloon' },
    { make: 'Mazda', model: 'CX-5', variant: '2.5L', fuel: 'petrol', cc: 2488, body: 'nonsaloon' },
    { make: 'Mazda', model: 'CX-30', variant: '2.0L', fuel: 'petrol', cc: 1998, body: 'nonsaloon' },

    // Ford / Isuzu
    { make: 'Ford', model: 'Ranger', variant: '2.0L Bi-Turbo Diesel', fuel: 'diesel', cc: 1996, body: 'nonsaloon' },
    { make: 'Isuzu', model: 'D-Max', variant: '1.9L Diesel', fuel: 'diesel', cc: 1898, body: 'nonsaloon' },
    { make: 'Isuzu', model: 'D-Max', variant: '2.2L Diesel', fuel: 'diesel', cc: 2164, body: 'nonsaloon' },
    { make: 'Isuzu', model: 'D-Max', variant: '3.0L Diesel', fuel: 'diesel', cc: 2999, body: 'nonsaloon' },

    // Chery / Jaecoo
    { make: 'Chery', model: 'Omoda 5', variant: '1.5L Turbo', fuel: 'petrol', cc: 1498, body: 'nonsaloon' },
    { make: 'Chery', model: 'Tiggo 7 Pro', variant: '1.6L Turbo', fuel: 'petrol', cc: 1598, body: 'nonsaloon' },
    { make: 'Chery', model: 'Tiggo 8 Pro', variant: '2.0L Turbo', fuel: 'petrol', cc: 1998, body: 'nonsaloon' },
    { make: 'Jaecoo', model: 'J7', variant: '1.6L Turbo', fuel: 'petrol', cc: 1598, body: 'nonsaloon' },

    // Lexus / Mercedes-Benz
    { make: 'Lexus', model: 'RX', variant: '2.4L Turbo Hybrid', fuel: 'petrol', cc: 2393, body: 'nonsaloon' },
    { make: 'Mercedes-Benz', model: 'C-Class', variant: 'C200 1.5L', fuel: 'petrol', cc: 1496, body: 'saloon' },
    { make: 'Mercedes-Benz', model: 'C-Class', variant: 'C300 2.0L', fuel: 'petrol', cc: 1991, body: 'saloon' },

    // BYD
    { make: 'BYD', model: 'Atto 2', variant: 'Premium', fuel: 'ev', kw: 130, body: 'nonsaloon' },
    { make: 'BYD', model: 'Atto 3', variant: 'Ultra', fuel: 'ev', kw: 150, body: 'nonsaloon' },
    { make: 'BYD', model: 'Atto 3', variant: 'Premium', fuel: 'ev', kw: 230, body: 'nonsaloon' },
    { make: 'BYD', model: 'Seal', variant: 'Premium', fuel: 'ev', kw: 230, body: 'saloon' },
    { make: 'BYD', model: 'Seal', variant: 'Performance', fuel: 'ev', kw: 390, body: 'saloon' },
    { make: 'BYD', model: 'Sealion 7', variant: 'Dynamic', fuel: 'ev', kw: 170, body: 'nonsaloon' },
    { make: 'BYD', model: 'Sealion 7', variant: 'Premium', fuel: 'ev', kw: 230, body: 'nonsaloon' },
    { make: 'BYD', model: 'Sealion 7', variant: 'Performance', fuel: 'ev', kw: 390, body: 'nonsaloon' },
    { make: 'BYD', model: 'M6', variant: 'Standard Range', fuel: 'ev', kw: 120, body: 'nonsaloon' },
    { make: 'BYD', model: 'M6', variant: 'Extended Range', fuel: 'ev', kw: 150, body: 'nonsaloon' },

    // Tesla
    { make: 'Tesla', model: 'Model 3', variant: 'RWD', fuel: 'ev', kw: 208, body: 'saloon' },
    { make: 'Tesla', model: 'Model 3', variant: 'Long Range RWD', fuel: 'ev', kw: 225, body: 'saloon' },
    { make: 'Tesla', model: 'Model 3', variant: 'Long Range AWD', fuel: 'ev', kw: 366, body: 'saloon' },
    { make: 'Tesla', model: 'Model 3', variant: 'Performance AWD', fuel: 'ev', kw: 461, body: 'saloon' },
    { make: 'Tesla', model: 'Model Y', variant: 'RWD', fuel: 'ev', kw: 220, body: 'nonsaloon' },
    { make: 'Tesla', model: 'Model Y', variant: 'Long Range RWD', fuel: 'ev', kw: 220, body: 'nonsaloon' },
    { make: 'Tesla', model: 'Model Y', variant: 'Long Range AWD', fuel: 'ev', kw: 378, body: 'nonsaloon' },
];
