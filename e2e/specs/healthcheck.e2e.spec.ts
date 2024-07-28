import { ping } from "tcp-ping"

describe("Health", () => {
    test("Reservation", async () => {
        const response = await fetch("http://127.0.0.1:3000/docs")
        expect(response.ok).toBeTruthy()
    })
    test("Auth", async () => {
        const response = await fetch("http://127.0.0.1:3001/docs")
        expect(response.ok).toBeTruthy()
    })
    test("Payment", (done) => {

        ping({ address: "127.0.0.1", port: 4002 }, (err, res) => {

            if (err) {
                fail()
            }
            done()
        })
    })
    test("Notification", (done) => {

        ping({ address: "127.0.0.1", port: 4003 }, (err, res) => {

            if (err) {
                fail()
            }
            done()
        })
    })
})