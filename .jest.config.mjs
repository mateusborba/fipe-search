import nextJest from "next/jest.js"

const createJestConfig = nextJest({

    dir: "./"
})


/** @type {import("jest").Config} */

const config = {

    setupFilesAfterEnv: ["<rootDir>/.jest.setup.ts"],
    testEnvironment: "jest-enviroment-jsdom"
}


export default createJestConfig(config)