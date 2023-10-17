import { gql } from '@apollo/client';

function Component({ style, className, attributes, children, ...props }) {
  const styles = {
    ...style,
  };
  const cssClassName = className ?? 'wp-block-create-block-block-b';
  return (
    <div
      style={styles}
      className={cssClassName}
      dangerouslySetInnerHTML={{ __html: attributes.message }}
    />
  );
}

Component.fragments = {
  key: `CreateBlockBlockBFragment`,
  entry: gql`
    fragment CreateBlockBlockBFragment on CreateBlockBlockB {
      attributes {
        message
      }
    }
  `,
};

Component.config = {
  name: 'CreateBlockBlockB',
  editorFields: {
    message: {
      type: 'string',
      label: 'My Message',
      location: 'editor',
    },
  },
};
export default Component;
