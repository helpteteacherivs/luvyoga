import { cn } from "@/lib/utils";

export const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="107"
    height="32"
    viewBox="0 0 107 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("h-8 w-auto", className)}
    {...props}
  >
    <path
      d="M21.2334 31.0116V14.1337C21.2334 9.17643 17.2407 5.18372 12.2834 5.18372H8.56673V0.831055H12.2834C19.5796 0.831055 25.5834 6.83486 25.5834 14.131V31.0116H21.2334Z"
      fill="currentColor"
    />
    <path
      d="M0.833374 31.0116V14.1337C0.833374 9.17643 4.82609 5.18372 9.78337 5.18372H13.5V0.831055H9.78337C2.48718 0.831055 -3.51663 6.83486 -3.51663 14.131V31.0116H0.833374Z"
      fill="currentColor"
    />
    <path
      d="M48.2435 1C42.8021 1 38.333 5.46914 38.333 10.9105V23.7199C38.333 28.1633 41.7451 31.5754 46.1885 31.5754H52.4135V1H48.2435Z"
      fill="currentColor"
    />
    <path
      d="M74.9084 1C80.3498 1 84.8189 5.46914 84.8189 10.9105V23.7199C84.8189 28.1633 81.4068 31.5754 76.9634 31.5754H70.7384V1H74.9084Z"
      fill="currentColor"
    />
    <path
      d="M56.4173 1H66.7391V31.5754H56.4173V1Z"
      fill="currentColor"
    />
    <path
      d="M106.167 0.831055H88.8182V5.18372H106.167V0.831055Z"
      fill="currentColor"
    />
  </svg>
);
