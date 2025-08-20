import { useRouter } from "next/router";

export default function PreviewButton() {
  const router = useRouter();

  return (
    <div className='fixed bottom-4 right-4 bg-[#0ECAD4] text-[#002447] pl-4 pr-2 py-2 rounded-lg shadow-lg flex items-center gap-3 z-50 max-w-xs'>
      <span className='font-semibold text-sm'>Preview mode is on</span>

      <button
        onClick={() => router.push("/api/disable-preview")}
        className='bg-[#002447] text-white text-sm px-3 py-2 rounded-md hover:opacity-90 transition cursor-pointer'>
        Exit preview mode
      </button>
    </div>
  );
}
