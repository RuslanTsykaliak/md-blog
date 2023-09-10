import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4 text-red-500">The post you are looking for does not exist.</h1>
            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 hover:border-blue-500 rounded mt-4"
                href="/">
                Go back to the home page
            </Link>
            </div>
    );
};
