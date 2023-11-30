module.exports = async function tearDown(){
    const instance =  global.__MONGOINSTANCE__;
    await instance.stop()
}