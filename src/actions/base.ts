import actionCreatorFactory from 'typescript-fsa'

export const actionCreator = actionCreatorFactory('typescript-python-boilerplate')

// export const actionTypePrefix = '@@typescript-python-boilerplate/'

// export type PaylodCreator = any

// export interface ActionsAndPayloadCreators {
//   [s: string]: PaylodCreator
// }

// /**
//  * toUpperSnakeCase description
//  * @param {string} str string to convert
//  * @return {string} returns uppser snake cased string
//  */
// function toUpperSnakeCase(str) {
//   return str.replace(/[A-Z]/g, (s) => '_' + s).toUpperCase()
// }

// /**
//  * createActionType description
//  * @param {string} prefix prefix
//  * @param {string} type type
//  * @return {string} action type string
//  */
// function createActionType(prefix: string, type: string) {
//   return `${actionTypePrefix}${toUpperSnakeCase(prefix)}_${toUpperSnakeCase(type)}`
// }

// /**
//  *
//  */
// export function createActions(prefix: str, payloadCreators: ActionsAndPayloadCreators) {
//   return Object.entries(payloadCreators).reduce(({actions, actionTypes}, [type, payloadCreator]) => {
//     const actionType = createActionType(prefix, type)
//     return {
//       actions: {
//         ...actions,
//         [type]: actionType
//       },
//       actionTypes: {
//         ...actionTypes,
//         [type]: createAction(actionType, payloadCreator)
//       }
//     }
//   }, {actions: {}, actionTypes: {}})
// }
