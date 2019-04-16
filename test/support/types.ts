import { Scalar } from '@musical-patterns/utilities'

interface TestSpecs {
    testSpec: Scalar<Scalar>,
}

enum ExampleEnum {
    OPTION_ONE = 'OPTION_ONE',
    OPTION_TWO = 'OPTION_TWO',
    OPTION_THREE = 'OPTION_THREE',
}

interface MinimumTestableSpec {
    justChangedSpec: number,
    otherSpec: number,
}

export {
    MinimumTestableSpec,
    ExampleEnum,
    TestSpecs,
}
