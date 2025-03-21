import { ExtendedSchema } from '../../types'
import { Filter } from '@cross-lab-project/openapi-codegen'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import standaloneCode from 'ajv/dist/standalone'

/**
 * This function defines a filter which can be used to generate the basic schema
 * validation functions for the provided schemas.
 * @param schemas The schemas for which to generate the validation functions.
 * @returns The validation functions as a string of code.
 */
function generateBasicValidationFunctions(schemas: ExtendedSchema[]) {
    const ajv: Ajv = new Ajv({
        code: { source: true, esm: true },
        verbose: true,
        inlineRefs: false,
    })
    ajv.addFormat(
        'jwt',
        /^Bearer ([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/
    )
    ajv.addFormat('mac_address', /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/)
    addFormats(ajv)
    ajv.addKeyword('x-name')
    ajv.addKeyword('x-typeguard')
    ajv.addKeyword('x-standalone')
    ajv.addKeyword('x-location')
    ajv.addKeyword('x-service-name')
    ajv.addKeyword('x-schema-type')
    const mapping: { [k: string]: string } = {}
    for (const schema of schemas) {
        ajv.addSchema(schema, schema['x-location'])
        mapping[
            'validate' +
                schema['x-name'].charAt(0).toUpperCase() +
                schema['x-name'].slice(1)
        ] = schema['x-location']
    }
    return standaloneCode(ajv, mapping)
}

export const generateBasicValidationFunctionsFilter: Filter = {
    name: 'generateBasicValidationFunctions',
    function: generateBasicValidationFunctions,
}
