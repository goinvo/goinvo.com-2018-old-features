require 'date'

module DataHelper
  def client_for_name(client_name)
    match = data.clients.detect { |c| c.name == client_name }
    puts "didn't find a match for name: #{client_name}" if match.nil?

    match
  end

  def page_for_meta(page)
    match = data.meta_tags.detect { |p| p.page == page }
    puts "didn't find a match for name: #{page}" if match.nil?

    match
  end

  def practice_areas(project)
    project.practice_area_names.split(',').map(&:strip)
  end

  # Feature articles yaml helpers
  def feature_articles_sorted_by_date()
    data.feature_articles.articles.sort { |a,b| a.date <=> b.date }.reverse
  end

  def feature_article_date(article)
    Date.parse(article.date).strftime("%B %Y")
  end
end
