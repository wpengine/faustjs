import * as React from 'react';

interface Attributes {
  heading: string;
  'submission-message': string;
  'main-copy': string;
  'button-text': string;
}

interface EmailOptInProps {
  attrs: Attributes;
  attributes: Attributes;
}

function EmailOptIn(props: EmailOptInProps): React.ReactElement {
  const { attrs, attributes } = props;
  const blockAttributes = attrs || attributes;
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  return (
    <div>
      <h3 className="text-lg mb-4">{blockAttributes.heading}</h3>
      {isSubmitted ? (
        <div className="mt-4">
          {isSuccess ? (
            <p>{blockAttributes['submission-message']}</p>
          ) : (
            <div>Sending!</div>
          )}
        </div>
      ) : (
        <div>
          <p>{blockAttributes['main-copy']}</p>
          <input
            className="mr-4 h-8 rounded-sm border border-gray-600 mt-2 px-2 text-sm"
            placeholder="First name"
            type="text"
          />
          <input
            className="mr-4 h-8 rounded-sm border border-gray-600 mt-2 px-2 text-sm"
            placeholder="Your email"
            type="text"
          />
          <button
            type="button"
            className="h-8 px-3 bg-blue-700 text-white rounded-sm text-sm"
            onClick={() => {
              setIsSubmitted(!isSubmitted);
              setTimeout(() => setIsSuccess(!isSuccess), 2000);
            }}>
            {blockAttributes['button-text']}
          </button>
        </div>
      )}
    </div>
  );
}

export default EmailOptIn;
