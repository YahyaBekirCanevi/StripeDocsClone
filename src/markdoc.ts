import Markdoc from '@markdoc/markdoc';
import { docsContent } from './docsContent';

export function parseDocs() {
  const ast = Markdoc.parse(docsContent);
  const config = {
    nodes: {
      fence: {
        render: 'Fence',
        attributes: {
          content: { type: String },
          language: { type: String },
        }
      }
    },
    tags: {
      section: {
        render: 'Section',
        attributes: {
          id: { type: String, required: true },
          title: { type: String, required: true },
        }
      },
      right: {
        render: 'Right',
        attributes: {}
      }
    }
  };
  const content = Markdoc.transform(ast, config);
  return content;
}
