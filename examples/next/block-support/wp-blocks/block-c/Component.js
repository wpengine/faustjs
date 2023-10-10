function Component({ style, className, attributes, children, ...props }) {
  const styles = {
    ...style,
  };
  return (
    <div
      {...props}
      style={styles}
      className={className}
      dangerouslySetInnerHTML={{ __html: attributes.message }}
    />
  );
}

Component.config = {
  name: 'CreateBlockBlockC',
  editorFields: {
    message: {
      type: 'string',
      label: 'My Message',
      location: 'editor',
    },
  },
};
export default Component;
