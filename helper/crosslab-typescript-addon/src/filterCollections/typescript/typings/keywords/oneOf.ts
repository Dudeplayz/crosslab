import { generateTyping, TypingOptions, Typing } from '../typing'
import { OpenAPIV3_1 } from 'openapi-types'

export function handleOneOf(
    schema: OpenAPIV3_1.SchemaObject,
    comment: string,
    options: TypingOptions
): Typing {
    const typeDeclarations = []
    let dependencies: Array<string> = []
    for (const subschema of schema.oneOf ?? []) {
        const td = generateTyping(subschema, options)
        typeDeclarations.push(td.typeDeclaration)
        dependencies = dependencies.concat(td.typeDependencies)
    }
    return {
        typeDeclaration: typeDeclarations.join(' | '),
        typeDependencies: dependencies,
        comment: comment,
    }
}
