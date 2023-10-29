import Image from "next/image";

type MessageBoxProps = {
  children?: React.ReactNode;
  images: string[];
};

const MessageBox: React.FC<MessageBoxProps> = ({ children, images }) => {
  return (
    <div>
      <div>
        <span>
          <p className="break-words text-[13px] text-white mb-[10px] leading-[17px]">
            <span>
              <span>{children}</span>
              <span className="max-w-[300px] my-[10px] block">
                {images.map((image, i) => (
                  <Image
                    key={i}
                    src={image}
                    alt={`Post image ${i}`}
                    width={300}
                    height={225}
                  />
                ))}
              </span>
            </span>
          </p>
        </span>
      </div>
    </div>
  );
};

export default MessageBox;
