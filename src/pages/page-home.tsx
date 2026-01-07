import Container from "@/components/container";
import PhotosList from "@/contexts/photos/components/photos-list";

export default function PageHome() {
	return (
		<Container>
			<PhotosList
				photos={[
					{
						id: "1",
						title: "ola mundo",
						imageId: "portrait-tower.png",
						albums: [
							{ id: "123", title: "album 1" },
							{ id: "321", title: "album 2" },
							{ id: "213", title: "album 3" },
						],
					},
				]}
			/>
			{/* <PhotosList photos={[]} loading /> */}
			{/* <PhotosList photos={[]} /> */}
		</Container>
	);
}
