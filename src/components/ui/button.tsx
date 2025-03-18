import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        success: "bg-green-600 text-white hover:bg-green-700",
        warning: "bg-yellow-600 text-white hover:bg-yellow-700",
        info: "bg-blue-600 text-white hover:bg-blue-700",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Buttonの基本的なプロパティ型を定義
interface ButtonBaseProps extends VariantProps<typeof buttonVariants> {
  className?: string;
}

// 標準ボタン用のプロパティ
interface StandardButtonProps extends ButtonBaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: false;
}

// asChild用のプロパティ
interface AsChildButtonProps extends ButtonBaseProps {
  asChild: true;
  children: React.ReactElement;
}

// ButtonPropsをStandardButtonPropsとAsChildButtonPropsの合併型として定義
type ButtonProps = StandardButtonProps | AsChildButtonProps;

// 子要素のプロパティの型を定義
interface ChildElementProps {
  className?: string;
  // プロパティ名と値の組み合わせを定義
  [key: string]: string | number | boolean | React.ReactNode | undefined | null | (() => void);
}

// Buttonコンポーネント
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  // propsを分解
  const { className, variant, size, fullWidth, ...restProps } = props;
  const buttonClass = cn(buttonVariants({ variant, size, fullWidth, className }));

  // asChildが有効な場合
  if ('asChild' in props && props.asChild) {
    const { asChild, children, ...rest } = props;
    
    // 単一の子要素をクローンし、スタイルを適用
    const child = React.Children.only(children) as React.ReactElement<ChildElementProps>;
    
    // childのpropsにアクセスできるようになった
    const childClassName = child.props.className || '';
    
    return React.cloneElement(child, {
      className: cn(buttonClass, childClassName),
      ...rest,
    });
  }

  // 通常のボタン
  return (
    <button 
      ref={ref}
      className={buttonClass}
      data-slot="button"
      {...restProps}
    >
      {props.children}
    </button>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants }
