/**
 * Product class
 */

function Product(name, description, votecount) {
	this.name = name;
	this.description = description;
	this.votecount = votecount;
	this.vote = vote;
	this.getVoteCount = getVoteCount;
}

function vote(plus) {
	if(plus)
		this.votecount += 1;
	else
		this.votecount -= 1;
}

function getVoteCount() {
	return this.votecount;
}