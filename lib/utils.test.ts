import { springConfig, fadeUpConfig } from './utils';

describe('Design System Foundation', () => {
  describe('Spring Animation Config', () => {
    it('should have correct stiffness and damping values', () => {
      expect(springConfig.stiffness).toBe(400);
      expect(springConfig.damping).toBe(30);
    });
  });

  describe('Fade-up Animation Config', () => {
    it('should have correct initial state', () => {
      expect(fadeUpConfig.initial).toEqual({ opacity: 0, y: 20 });
    });

    it('should have correct animate state', () => {
      expect(fadeUpConfig.animate).toEqual({ opacity: 1, y: 0 });
    });

    it('should have correct transition timing', () => {
      expect(fadeUpConfig.transition.duration).toBe(0.5);
      expect(fadeUpConfig.transition.ease).toEqual([0.22, 1, 0.36, 1]);
    });
  });
});
