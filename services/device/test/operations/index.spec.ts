import { AppDataSource } from '../../src/database/dataSource'
import { TestData } from '../data/index.spec'
import { initTestDatabase } from '../database/repositories/index.spec'
import deviceTests from './devices/index.spec'
import peerconnectionTests from './peerconnections/index.spec'

const tests = [...deviceTests, ...peerconnectionTests]

describe('Operations', function () {
    let testData: TestData
    let suite: Mocha.Suite = this

    this.beforeAll(async function () {
        console.log = (_message: any, ..._optionalParams: any[]) => undefined
        console.error = (_message: any, ..._optionalParams: any[]) => undefined
        console.warn = (_message: any, ..._optionalParams: any[]) => undefined
        console.info = (_message: any, ..._optionalParams: any[]) => undefined
        testData = await initTestDatabase()
    })

    this.beforeEach(async function () {
        if (AppDataSource.connected) {
            await AppDataSource.teardown()
        }
        const newTestData = await initTestDatabase()
        for (const key in newTestData) {
            ;(testData as any)[key] = (newTestData as any)[key]
        }
    })

    it('should initialize the test data', async function () {
        for (const test of tests) {
            suite.addSuite(test(suite.ctx, testData))
        }
    })
})
