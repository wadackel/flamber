// flow-typed signature: ec5fc4afdcab42a351bb8f7d4b55c90d
// flow-typed version: 94e9f7e0a4/redux-actions_v0.9.x/flow_>=v0.23.x

declare module 'redux-actions' {
  declare function createAction(type: string, payloadCreator?: Function, metaCreator?: Function): Function;
  declare function handleAction(type: string, reducer: Object|Function): void;
  declare function handleActions(reducerMap: Object, defaultState?: Object): void;
}
