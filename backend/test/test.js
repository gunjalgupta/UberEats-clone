process.env.NODE_ENV = 'test';

const assert = require("chai").assert;
const index = require("../src/server");
const chai = require("chai");
chai.use(require("chai-http"));
const expect = require("chai").expect;
const agent = require("chai").request.agent(index);


describe("UberEatsBackend Testing", function (){


    describe("Login Test", function () {
        it("Incorrect Password", (done) => {
          agent
            .post("/customer/api/login")
            .send({ email: "user1@gmail.com", pwd: "123" })
            .then(function (res) {
              expect(res.status).to.not.equal(200);
            })
            .catch((error) => {
              console.log(error);
            });
            done();
        })
  
        it("Correct Password", (done)=>{
            agent
                .post("/customer/api/login")
                .send({email: "user1@gmail.com" , pwd: "1234"})
                .then(function (res){
                    expect(res.status).to.eql(200);
                })
                .catch((error) =>{
                    console.log(error);
                });
                done();
        })
    });
    
    describe("Signup Test", function () {
        it("same email", (done) => {
          agent
            .post("/customer/api/register")
            .send({name:"12345", email: "user1@gmail.com", pwd: "" })
            .then(function (res) {
            expect(res.status).to.eql(299);
              expect(res.body.message).to.equal('Email already exists');
            })
            .catch((error) => {
              console.log(error);
            });
            done();
        })


        it("successful", (done) => {
            agent
              .post("/customer/api/register")
              .send({name:"12345", email: "gunjalgupta@gmail.com", cname:"gunjal", pwd: "1234" })
              .then(function (res) {
                expect(res.status).to.eql(200);
                //expect(res.body.email).to.equal("gunjalgupta@gmail.com");
              })
              .catch((error) => {
                console.log(error);
              });
              done();
          })
    
    });
    describe("Check fav", function () {
        it("success", (done) => {
          agent
            .post("/customer/api/checkfav")
            .send({
                "restaurantId":2,
                "customerId": 1  
            })
            .then(function (res) {
            expect(res.status).to.eql(200);
              expect(res.text).to.equal('success')
            })
            .catch((error) => {
              console.log(error);
            });
            done();
        })
    })

    describe("Add fav", function () {
        it("success", (done) => {
          agent
            .post("/customer/api/addfav")
            .send({
                "restaurantId":3,
                "customerId": 1  
            })
            .then(function (res) {
            expect(res.status).to.eql(200);
            })
            .catch((error) => {
              console.log(error);
            });
            done();
        })
    })

    describe("Get dish", function () {
        it("success", (done) => {
          agent
            .post("/restaurant/api/getd/9/1")
            
            .then(function (res) {
            expect(res.status).to.eql(200);
            expect(res.dishId).to.eql(9);
            })
            .catch((error) => {
              console.log(error);
            });
            done();
        })
    })
 
   
    

});