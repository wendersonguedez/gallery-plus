import Container from "@/components/container";
import PhotoWidget from "@/contexts/photos/components/photo-widget";
import { Photo } from "@/contexts/photos/models/photo";

export default function PageHome() {
	return (
		<Container>
			<div className="grid grid-cols-4 gap-9">
				<PhotoWidget
					photo={{
						id: "1",
						title: "ola mundo",
						imageId: "portrait-tower.png",
						albums: [
							{ id: "123", title: "album 1" },
							{ id: "321", title: "album 2" },
							{ id: "213", title: "album 3" },
						],
					}}
				/>
				<PhotoWidget photo={{} as Photo} loading />
			</div>
		</Container>
	);
}
