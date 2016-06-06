export default function bindHandlerHelper(handlers, instance) {
  handlers.forEach(handler => {
    instance[handler] = instance[handler].bind(instance);
  });
}
