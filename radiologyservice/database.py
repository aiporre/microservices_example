
item = {'id': 0, 'file':'./data/hand.png'}

# this in antipattern a dictiory accomplish the same
class DataBase(object):
    def __init__(self):
        self.items = [item]
    def search(self,id=0):
        return self.items[0]
