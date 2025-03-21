import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Check, Copy, Download, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import EditLink from "./EditLink";

const LinkCard = ({ url, fun, isPending }) => {
    const [copied, setCopied] = useState(false);
    
    const downloadImage = () => {
        const imageUrl = url?.qrCode;
        const fileName = url?.title;
        const achor = document.createElement("a");
        achor.href = imageUrl;
        achor.download = fileName;

        document.body.appendChild(achor);
        achor.click();

        document.body.removeChild(achor);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND_HOST}/${url?.shortUrl}`);
            setCopied(true);
            toast.success("Copied To Clipboard!");

            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast.error("Failed To Copy!");
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
            <img className="h-32 object-contain ring ring-blue-600 self-start" src={url?.qrCode} alt="Qr Code" />
            <Link to={`/link/${url?._id}`} className="flex flex-col flex-1">
                <span className="text-3xl font-extrabold hover:underline cursor-pointer">{url?.title}</span>
                <span className="text-2xl text-blue-500 font-bold hover:underline cursor-pointer">{`${import.meta.env.VITE_FRONTEND_HOST}/${url?.customUrl ? url?.customUrl : url?.shortUrl}`}</span>
                <span className="flex items-center gap-1 hover:underline cursor-pointer">{url.originalUrl}</span>
                <span className="flex items-end font-extralight text-sm flex-1">{new Date(url.createdAt).toLocaleString()}</span>
            </Link>
            <div className="flex gap-2">
                <Button variant="ghost" onClick={handleCopy} className="relative transition duration-150 ease-in-out cursor-pointer">
                    {copied ? <Check className="text-green-500" /> : <Copy />}
                </Button>
                <Button className="cursor-pointer" variant="ghost" onClick={downloadImage}>
                    <Download />
                </Button>
                <Button className="cursor-pointer" variant="ghost" onClick={() => fun(url?._id)}>
                    {isPending ? <BeatLoader size={5} color="white" /> : <Trash />}
                </Button>
                {/* {isPending ? <BeatLoader size={5} color="white" /> : <Edit />} */}
                <EditLink urlId={url?._id} />
            </div>
        </div>
    );
};

export default LinkCard;
