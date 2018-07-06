import numpy as np

# read glove vector, take a path
def read_glove_vecs(glove_file="glove.6B.200d.txt"):
    """
        Reade GloVe vector from a given file
        Arguments: filepath to the location of the GloVe
        Returns:
            - words_to_index: Mapping of a word to its location in the dictionary
            - index_to_words: Mapping of a location in the dictionary to a word
            - word_to_vec_map: Mapping of a word to its GloVe representation
    """
    with open(glove_file, 'r') as f:
        words = set()
        word_to_vec_map = {}
        for line in f:
            
            line = line.strip().split()
            curr_word = line[0]

            words.add(curr_word)
            
            word_to_vec_map[curr_word] = np.array(line[1:], dtype=np.float64)
        
        i = 1
        words_to_index = {}
        index_to_words = {}
        for w in sorted(words):
            words_to_index[w] = i
            index_to_words[i] = w
            i = i + 1
    return words_to_index, index_to_words, word_to_vec_map

def save_database(words_to_index, word_to_vec_map, db, GloveEmbedding):
    """
        Save the GloVe Embeddings into datbase using SqlAlchemy
        Arugments:
            - words_to_index: mapping of the word to its location in dictionary
            - word_to_vec_map: mapping of the word to its vector representation
            - db: database instance
            - GloveEmbedding: table instace for containg embedding
        Returns: True for successful saving or else False
    """
    try:
        for word in word_to_vec_map:
            index = words_to_index[word]
            vector = word_to_vec_map[word]
            vector_string = vector.tostring()
            new_word = GloveEmbedding(id=index, word=word, vector=vector_string)
            db.session.add(new_word)
            db.session.commit()
    except KeyError:
        return False
    return True
