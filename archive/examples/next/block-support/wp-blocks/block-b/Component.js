import { gql } from '@apollo/client';

function Component({ style, attributes, children, ...props }) {
  const styles = {
    ...style,
  };
  const cssClassName = 'create-block-block-b-message';
  return (
    <>
    <div
      style={styles}
      className={cssClassName}
      dangerouslySetInnerHTML={{ __html: attributes.message }}
    />
    <div
      style={styles}
      className="rich-text"
      dangerouslySetInnerHTML={{ __html: attributes.richText }}
    />
    </>
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
