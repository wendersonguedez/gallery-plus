import type { Photo } from "@/contexts/photos/models/photo";
import PhotoWidget from "@/contexts/photos/components/photo-widget";
import Text from "@/components/text";
import Skeleton from "@/components/skeleton";

interface PhotoListProps {
	photos: Photo[];
	loading?: boolean;
}

export default function PhotosList({ photos, loading }: PhotoListProps) {
	return (
		<div className="space-y-6">
			<Text
				as="div"
				variant="paragraph-large"
				className="flex items-center justify-end text-accent-span gap-1"
			>
				Total:{" "}
				{!loading ? (
					<div>{photos.length}</div>
				) : (
					<Skeleton className="w-6 h-6" />
				)}
			</Text>

			{!loading && photos.length > 0 && (
				<div className="grid grid-cols-5 gap-9">
					{photos.map((photo) => (
						<PhotoWidget photo={photo} key={photo.id} />
					))}
				</div>
			)}

			{loading && (
				<div className="grid grid-cols-5 gap-9">
					{Array.from({ length: 5 }).map((_, index) => (
						<PhotoWidget
							key={`photo-loading-${index}`}
							photo={{} as Photo}
							loading
						/>
					))}
				</div>
			)}

			{!loading && photos.length === 0 && (
				<div className="flex justify-center items-center h-full">
					<Text variant="paragraph-large">Nenhuma foto encontrada</Text>
				</div>
			)}
		</div>
	);
}
