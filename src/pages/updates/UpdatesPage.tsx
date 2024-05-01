import updates from "../../data/updates/updates";

const UpdatesPage: React.FC = () => {
	const sortedUpdates = updates.sort((a, b) => {
		return a.version.localeCompare(b.version) * -1;
	});
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-5xl font-extrabold mb-4">Updates</h1>
			{sortedUpdates.map((update, index) => (
				<div key={index} className="mb-8">
					<h2 className="text-3xl font-bold">Version {update.version} - {update.name}</h2>
          <p className="text-lg mb-2 font-light">
						{update.date}
					</p>
					{update.changes && (
						<div>
							<p className="text-lg mb-2">
								<strong>Changes:</strong>
							</p>
							<ul className="list-disc list-inside">
								{update.changes.map((change, index) => (
									<li key={index} className="text-lg">
										{change}
									</li>
								))}
							</ul>
						</div>
					)}
					{update.addedFeatures && (
						<div>
							<p className="text-lg mb-2">
								<strong>Added Features:</strong>
							</p>
							<ul className="list-disc list-inside">
								{update.addedFeatures.map((feature, index) => (
									<li key={index} className="text-lg">
										{feature}
									</li>
								))}
							</ul>
						</div>  
					)}

					{index !== updates.length-1 && <hr className="my-4" />}
				</div>
			))}
		</div>
	);
};

export default UpdatesPage;
