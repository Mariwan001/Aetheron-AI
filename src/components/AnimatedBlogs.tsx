import { AnimatedTestimonials } from "../ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote: "Exploring the latest trends in web development and how they're shaping the future of digital experiences.",
      name: "Modern Web Development",
      designation: "Technology Insights",
      src: "/assets/images/image-3.png",
    },
    {
      quote: "How artificial intelligence is revolutionizing the way we approach software design and user interaction.",
      name: "AI in Design",
      designation: "Innovation Spotlight",
      src: "/assets/images/image-4.png", 
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
