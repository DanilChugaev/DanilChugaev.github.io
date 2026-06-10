import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useScrollToSection } from './useScrollToSection';

describe('useScrollToSection', () => {
  let scrollToSpy: any;

  beforeEach(() => {
    // Mock window.scrollTo
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    // Mock element.getBoundingClientRect()
    const mockRect = { top: 200, left: 0, width: 100, height: 100 };
    Object.defineProperty(Element.prototype, 'getBoundingClientRect', {
      value: vi.fn(() => mockRect),
      writable: true,
      configurable: true,
    });

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('должен прокрутить к элементу при наличии элемента с указанным ID', () => {
    const mockElement = document.createElement('div');
    vi.spyOn(document, 'getElementById').mockReturnValue(
      mockElement as unknown as HTMLElement,
    );

    const { scrollToSection } = useScrollToSection();
    scrollToSection('projects');

    expect(document.getElementById).toHaveBeenCalledWith('projects');
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 200 + 0 - 80, // elementPosition + scrollY - HEADER_OFFSET
      behavior: 'smooth',
    });
  });

  it('не должен вызывать scrollTo если элемент не найден', () => {
    vi.spyOn(document, 'getElementById').mockReturnValue(null);

    const { scrollToSection } = useScrollToSection();
    scrollToSection('hero');

    expect(document.getElementById).toHaveBeenCalledWith('hero');
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('должен учитывать текущую позицию прокрутки', () => {
    Object.defineProperty(window, 'scrollY', {
      value: 500,
      writable: true,
      configurable: true,
    });

    const mockElement = document.createElement('div');
    vi.spyOn(document, 'getElementById').mockReturnValue(
      mockElement as unknown as HTMLElement,
    );

    const { scrollToSection } = useScrollToSection();
    scrollToSection('about');

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 200 + 500 - 80,
      behavior: 'smooth',
    });
  });

  it('должен использовать HEADER_OFFSET равный 80', () => {
    const mockElement = document.createElement('div');
    vi.spyOn(document, 'getElementById').mockReturnValue(
      mockElement as unknown as HTMLElement,
    );

    const { scrollToSection } = useScrollToSection();
    scrollToSection('skills');

    expect(scrollToSpy).toHaveBeenNthCalledWith(1, {
      top: 200 + 0 - 80, // elementPosition + scrollY - 80
      behavior: 'smooth',
    });
  });

  it('должен использовать плавную прокрутку (behavior: smooth)', () => {
    const mockElement = document.createElement('div');
    vi.spyOn(document, 'getElementById').mockReturnValue(
      mockElement as unknown as HTMLElement,
    );

    const { scrollToSection } = useScrollToSection();
    scrollToSection('contacts');

    expect(scrollToSpy).toHaveBeenNthCalledWith(1, {
      top: 200 + 0 - 80,
      behavior: 'smooth',
    });
  });
});
