import FluidLinkButton from "@/components/FluidLinkButton";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <div className="font-display text-[28vw] leading-none md:text-[16rem]">
        404
      </div>
      <p className="mono-label mt-4">page not found</p>
      <FluidLinkButton href="/" variant="tertiary" leadingIcon="arrow-left" className="mt-8">
        Back home
      </FluidLinkButton>
    </div>
  );
}
