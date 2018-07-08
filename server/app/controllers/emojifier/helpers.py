import os
import numpy as np
import emoji
from keras.models import Model, load_model

emoji_dictionary = {"0": ":heart:",    # :heart: prints a black instead of red heart depending on the font
                    "1": ":baseball:",
                    "2": ":smile:",
                    "3": ":disappointed:",
                    "4": ":fork_and_knife:",
                    "5": ":confused:",
                    "6": ":angry:",
                    "7": ":two_men_holding_hands:",
                    "8": ":sleeping:",
                    "9": ":sunny:",
                    "10": ":umbrella:",
                    "11": ":cloud:",
                    "12": ":snowflake:",
                    "13": ":earth_asia:",
                    "14": ":arrow_up:",
                    "15": ":scream:",
                    "16": ":hankey:",
                    "17": ":unamused:",
                    "18": ":neutral_face:",
                    "19": ":smirk:",
                    "20": ":joy:",
                    "21": ":fearful:"}

def label_to_emoji(label, unicode=False):
    """
    Converts a label (int or string) into the corresponding emoji code (string) ready to be printed
    """
    if unicode:
        return emoji_dictionary[str(label)]
    return emoji.emojize(emoji_dictionary[str(label)], use_aliases=True)

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
            print(word)
    except KeyError:
        return False
    return True

def emojifier_setup(db, GloveEmbedding):
    words_to_index, index_to_words, word_to_vec_map = read_glove_vecs()
    save_database(words_to_index, word_to_vec_map, db, GloveEmbedding)

def get_model():
    global emojifier_model
    current_path = os.path.dirname(__file__)
    emojifier_model = load_model(os.path.join(current_path, "emojifier_LSTM.h5"))
    return emojifier_model

def sentence_to_vector(X, max_len=25):
    """
    Converts an array of sentences into its GloVE representation.
    The output shape should be such that it can be feed to the model for getting prediction.
    
    Arguments:
    X -- array of sentence (strings)
    max_len -- maximum number of words in a sentence.
    
    Returns:
    vector -- vector representation of the sentence (max_len, 200)
    """
    from app.models import GloveEmbedding

    vector = np.zeros((1, max_len, 200))
        
    sentence_words = X.lower().split()
    i = 0
    for w in sentence_words:
        
        # get the vector representation of the word from the dictionary
        word_vector = GloveEmbedding.query.filter_by(word=w).first()
        if word_vector:
            word_vector = word_vector.vector
            word_vector = np.fromstring(word_vector)
            np.reshape(word_vector, (1, 200))

            # put it in the vector for returning
            vector[0, i, :] = word_vector
        i += 1
    
    return vector

def prepare_sentence(sentence):
    vector = sentence_to_vector(sentence)
    return vector

