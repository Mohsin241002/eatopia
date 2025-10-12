'use client';

interface SimpleAvatarProps {
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'subtle';
}

export const SimpleAvatar = ({ 
  name = "User", 
  size = "sm", 
  variant = "solid" 
}: SimpleAvatarProps) => {
  // Get initials from name
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  // Variant classes
  const variantClasses = {
    solid: 'bg-orange-500 text-white',
    outline: 'border-2 border-orange-500 text-orange-500 bg-transparent',
    subtle: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        ${variantClasses[variant]}
        rounded-full 
        flex 
        items-center 
        justify-center 
        font-roboto 
        font-medium
        transition-all 
        duration-200
        hover:scale-105
        hover:shadow-lg
      `}
    >
      {getInitials(name)}
    </div>
  );
};
