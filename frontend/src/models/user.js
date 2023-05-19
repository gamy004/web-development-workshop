export class User {
	constructor(args) {
		this.id = args.id ?? null;
		this.username = args.username ?? null;
		this.email = args.email ?? null;
		this.provider = args.provider ?? null;
		this.role = {
			id: args.role.id ?? null,
			name: args.role.name ?? null,
			type: args.role.type ?? null,
			description: args.role.description ?? null,
		};
		this.confirmed = args.confirmed ?? null;
		this.blocked = args.blocked ?? null;
		this.createdAt = args.created_at ?? null;
		this.updatedAt = args.updated_at ?? null;
	}
}

export default User;
