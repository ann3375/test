import React, { useState } from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

export const Icon: React.FC<IconProps> = ({ name, ...rest }): JSX.Element | null => {
  const importedIconRef = React.useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        importedIconRef.current = (
          await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!../../../assets/images/${name}.svg`)
        ).default;
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    };
    importIcon();
    return () => {
      setIsLoading(false);
    };
  }, [name]);

  if (!isLoading && importedIconRef.current) {
    const { current: ImportedIcon } = importedIconRef;

    return <ImportedIcon {...rest} />;
  }

  return null;
};
