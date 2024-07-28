describe("Reservation", () => {
    let jwt: string
    const deafultConfigs = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authentication: jwt
        }
    }
    beforeAll(async () => {
        const user = {
            "email": "email2@email.com",
            "password": "saxfg;kl$#@#FC^2hjweqf23"
        }
        const response = await fetch("http://127.0.0.1:3001/api/auth/login", {
            ...deafultConfigs,
            body: JSON.stringify(user) ,
        })
         jwt = await response.text()
    })

    test("Create", async () => {
        const data = {
            "startDate": "2024-02-08",
            "endDate": "2024-02-12",
            "userId": "1",
            "placeId": "1",
            "invoiceId": "1",
            "charge": {
                "card": {
                    "cvc": "23",
                    "exp_month": 213,
                    "exp_year": 23,
                    "number": "4242 4242 4242 4242"
                },
                "amount": 2
            }
        }
       
        const response = await fetch("http://127.0.0.1:3000/api/reservation", {
            ...deafultConfigs,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authentication' : jwt
            }
        })
        console.log(response)
        expect(response.ok).toBeTruthy()
        const reservation = await response.json()
        console.log(reservation)

    })
})