import '@testing-library/jest-dom';

jest.mock('framer-motion', () => {
  const React = require('react');
  
  const mockComponent = (Tag: string) => {
    return React.forwardRef((props: any, ref: any) => {
      // Filter out framer-motion specific props to avoid React DOM warnings
      const {
        initial,
        animate,
        exit,
        transition,
        whileHover,
        whileTap,
        whileInView,
        viewport,
        variants,
        onHoverStart,
        onHoverEnd,
        layoutId,
        layout,
        ...rest
      } = props;
      
      // Also filter out any non-DOM attributes like 'fill' boolean
      if (typeof rest.fill === 'boolean') {
        delete rest.fill;
      }

      return React.createElement(Tag, { ref, ...rest });
    });
  };

  return {
    motion: {
      div: mockComponent('div'),
      span: mockComponent('span'),
      h1: mockComponent('h1'),
      h2: mockComponent('h2'),
      h3: mockComponent('h3'),
      p: mockComponent('p'),
      section: mockComponent('section'),
      aside: mockComponent('aside'),
      header: mockComponent('header'),
      nav: mockComponent('nav'),
      ul: mockComponent('ul'),
      li: mockComponent('li'),
      button: mockComponent('button'),
      a: mockComponent('a'),
    },
    AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
    useScroll: () => ({ scrollYProgress: { get: () => 0, onChange: () => () => {} } }),
    useTransform: () => ({ get: () => 0 }),
    useMotionTemplate: () => '',
    useMotionValue: () => ({ set: jest.fn(), get: () => 0 }),
    useAnimation: () => ({ start: jest.fn(), stop: jest.fn() }),
  };
});
